import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FixtureModel } from 'src/app/@core/models/fixture.model';
import { PlayerModel } from 'src/app/@core/models/player.model';
import { ResponseModel } from 'src/app/@core/models/response.model';
import { FixtureService } from 'src/app/@core/services/fixture.service';
import { PlayerService } from 'src/app/@core/services/player.service';
import { StringHelper } from 'src/app/@core/utils/helpers';
import { AuthComponent } from 'src/app/components/dialog/auth/auth.component';
import { GenerateFixtureComponent } from 'src/app/components/dialog/generate-fixture/generate-fixture.component';
import { LoadingComponent } from 'src/app/components/dialog/loading/loading.component';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.scss'],
})
export class FixtureComponent implements OnInit {
  searchForm: FormGroup;
  fixtures: FixtureModel[] = [];
  resultFixtures: FixtureModel[] = [];
  vsStatus: boolean[] | null[] = [];
  hasResult: boolean = false;
  playerStats: PlayerModel[] = [];

  private fixtureKey: string = 'fixture';
  private statusKey: string = 'status';

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private fixtureService: FixtureService,
    private playerService: PlayerService,
  ) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      name: ['', Validators.required]
    })

    this.searchForm.get('name').valueChanges.subscribe(_ => {
      this.fixtures = JSON.parse(localStorage.getItem(this.fixtureKey));
    })

    if (localStorage.getItem(this.fixtureKey)) {
      this.fixtures = JSON.parse(localStorage.getItem(this.fixtureKey))
    }

    if (localStorage.getItem(this.statusKey)) {
      this.vsStatus = JSON.parse(localStorage.getItem(this.statusKey))
    }

    this.fixtureService.fixturesObserver().subscribe((data) => {
      if (data.length) {
        this.fixtures = []
        this.vsStatus = new Array(data.length);

        data.forEach((fx, index) => {
          this.fixtures.push(new FixtureModel(index, fx.teamA, fx.teamB))
        })

        localStorage.setItem(this.fixtureKey, JSON.stringify(this.fixtures));
        localStorage.setItem(this.statusKey, JSON.stringify(this.vsStatus));
      }
    });
  }

  openFixture() {
    this.dialog.open(GenerateFixtureComponent, {
      width: window.screen.width > 600 ? '400px' : '100%',
    });
  }

  showResult() {
    this.hasResult = true
    this.fixtures = JSON.parse(localStorage.getItem(this.fixtureKey));

    this.resultFixtures = this.fixtures.filter((_, index) => {
      return this.vsStatus[index] !== null && this.vsStatus[index] !== undefined;
    })

    this.calculateWinLose()
  }

  showFixture() {
    this.hasResult = false;
  }

  disableShowResult() {
    return !this.vsStatus.some((vs) => vs !== null)
  }

  calculateWinLose() {
    let playerStatsList: PlayerModel[] = [];

    this.resultFixtures.forEach((fx, index) => {
      let player1 = new PlayerModel();
      let player2 = new PlayerModel();
      let player3 = new PlayerModel();
      let player4 = new PlayerModel();

      if (this.vsStatus[index]) {
        player1 = new PlayerModel(fx.teamA[0], 1, 0);
        player2 = new PlayerModel(fx.teamA[1], 1, 0);
        player3 = new PlayerModel(fx.teamB[0], 0, 1);
        player4 = new PlayerModel(fx.teamB[1], 0, 1);
      } else {
        player1 = new PlayerModel(fx.teamA[0], 0, 1);
        player2 = new PlayerModel(fx.teamA[1], 0, 1);
        player3 = new PlayerModel(fx.teamB[0], 1, 0);
        player4 = new PlayerModel(fx.teamB[1], 1, 0);
      }

      playerStatsList = [...playerStatsList, player1, player2, player3, player4];
    })

    const playerStatsObject: { [key: string]: PlayerModel } = {};

    playerStatsList.forEach((entry) => {
      const playerName = entry.name;

      if (!playerStatsObject[playerName]) {
        playerStatsObject[playerName] = new PlayerModel(playerName, 0, 0);
      }

      playerStatsObject[playerName].win += entry.win;
      playerStatsObject[playerName].lose += entry.lose;
    });

    this.playerStats = Object.values(playerStatsObject)
    this.playerStats = this.playerStats.sort((a, b) => {
      if (a.win !== b.win) {
        return b.win - a.win;
      }
      return a.lose - b.lose;
    })
  }

  updatePlayers() {
    const dialogRef = this.dialog.open(AuthComponent, {
      width: window.screen.width > 600 ? '400px' : '100%'
    });

    dialogRef.afterClosed().subscribe(async (data) => {
      if (data) {
        const loadingRef = this.dialog.open(LoadingComponent, {
          data: {
            message: "Updating stats"
          },
          disableClose: true,
        })

        const res = this.playerService.updateMatch(this.playerStats);

        res.subscribe((data: ResponseModel) => {
          loadingRef.close();

          if (!data.isSuccess) {
            alert(data.message);
            return;
          }

          this.playerService.getPlayerList();
          alert(data.message);
          localStorage.removeItem(this.fixtureKey)
          localStorage.removeItem(this.statusKey)
          this.hasResult = false;
        });
      }
    });
  }

  capitalizeName(name: string) {
    return StringHelper.capitalizeFirst(name);
  }

  getVSClass(index: number): string {
    return this.vsStatus[index] === true
      ? 'green-red'
      : this.vsStatus[index] === false
        ? 'red-green'
        : 'default';
  }

  changeVSStatus(index: number) {
    if (this.vsStatus[index] === null || this.vsStatus[index] === undefined) {
      this.vsStatus[index] = true;
    } else if (this.vsStatus[index] === true) {
      this.vsStatus[index] = false;
    } else {
      this.vsStatus[index] = null;
    }

    localStorage.setItem(this.statusKey, JSON.stringify(this.vsStatus));
  }

  hasFixtureKey(): string | null {
    return localStorage.getItem(this.fixtureKey)
  }

  searchFixture() {
    if (!this.searchForm.valid) {
      this.fixtures = JSON.parse(localStorage.getItem(this.fixtureKey));
      return;
    }

    let player: string = this.searchForm.value['name'];
    player = player.toLowerCase();

    this.fixtures = this.fixtures.filter((fx) => {
      const searchTeamA = player.includes(fx.teamA[0]) && player.includes(fx.teamA[1]);
      const searchTeamB = player.includes(fx.teamB[0]) && player.includes(fx.teamB[1]);

      return searchTeamA || searchTeamB;
    })
  }
}
