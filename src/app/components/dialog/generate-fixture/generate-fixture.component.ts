import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PlayerModel } from 'src/app/@core/models/player.model';
import { ResponseModel } from 'src/app/@core/models/response.model';
import { FixtureService } from 'src/app/@core/services/fixture.service';
import { PlayerService } from 'src/app/@core/services/player.service';
import { StringHelper } from 'src/app/@core/utils/helpers';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-generate-fixture',
  templateUrl: './generate-fixture.component.html',
  styleUrls: ['./generate-fixture.component.scss'],
})
export class GenerateFixtureComponent implements OnInit {
  playerForm: FormGroup;
  players: PlayerModel[];
  playerMatch: PlayerModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private fixtureService: FixtureService,
    private playerService: PlayerService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<GenerateFixtureComponent>
  ) { }

  ngOnInit(): void {
    this.playerService.getPlayerList();

    this.playerService.playersObserver().subscribe((data) => {
      this.players = data;
      this.players.sort(this.sortPlayer);
    });

    this.playerForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  addPlayerMatch() {
    if (!this.playerForm.valid) {
      alert('Please fill required field.');
      return;
    }

    const nameExist = this.playerMatch.some(
      (data) => data.name === this.playerForm.value['name']
    );

    if (nameExist) {
      alert('Player already added.');
      return;
    }

    this.playerMatch.push(this.playerForm.value);
    this.playerForm.reset();
  }

  deletePlayerMatch(player: PlayerModel) {
    const playerIndex = this.playerMatch.findIndex(
      (data) => data.name === player.name
    );

    if (playerIndex !== -1) {
      this.playerMatch.splice(playerIndex, 1);
    }
  }

  async generateFixture() {
    const players = this.playerMatch.map((player) => player.name);

    if (players.length < 4) {
      alert('Player must have at least four.');
      return;
    }

    const loadingRef = this.dialog.open(LoadingComponent, {
      data: {
        message: "Generating fixture"
      },
      disableClose: true,
    })

    const res = this.fixtureService.generateFixture(players);

    res.subscribe((data: ResponseModel) => {
      loadingRef.close();

      if (!data.isSuccess) {
        alert(data.message);
        return;
      }

      this.dialogRef.close();
    });
  }

  capitalizeName(name: string) {
    return StringHelper.capitalizeFirst(name);
  }

  private sortPlayer(a: PlayerModel, b: PlayerModel) {
    if (a.points !== b.points) {
      return b.points - a.points;
    }

    return a.name.localeCompare(b.name);
  }
}
