import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FixtureModel } from 'src/app/@core/models/fixture.model';
import { FixtureService } from 'src/app/@core/services/fixture.service';
import { StringHelper } from 'src/app/@core/utils/helpers';
import { GenerateFixtureComponent } from 'src/app/components/dialog/generate-fixture/generate-fixture.component';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.scss'],
})
export class FixtureComponent implements OnInit {
  fixtures: FixtureModel[] = [];
  vsStatus: boolean[] = [];

  private fixtureKey: string = 'fixture';
  private statusKey: string = 'status';

  constructor(
    private dialog: MatDialog,
    private fixtureService: FixtureService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem(this.fixtureKey)) {
      this.fixtures = JSON.parse(localStorage.getItem(this.fixtureKey))
    }

    if (localStorage.getItem(this.statusKey)) {
      this.vsStatus = JSON.parse(localStorage.getItem(this.statusKey))
    }

    this.fixtureService.fixturesObserver().subscribe((data) => {
      if (data.length) {
        this.vsStatus = [];
        this.fixtures = data;
        localStorage.setItem(this.fixtureKey, JSON.stringify(this.fixtures));
        localStorage.removeItem(this.statusKey);
      }
    });
  }

  openFixture() {
    this.dialog.open(GenerateFixtureComponent, {
      width: window.screen.width > 600 ? '400px' : '100%',
    });
  }

  capitalizeName(name: string) {
    return StringHelper.capitalizeFirst(name);
  }

  getVSClass(index: number): string {
    return this.vsStatus[index]
      ? 'green-red'
      : this.vsStatus[index] === false
        ? 'red-green'
        : 'default';
  }

  changeVSStatus(index: number) {
    if (this.vsStatus[index] === undefined) {
      this.vsStatus[index] = true;
    } else if (this.vsStatus[index]) {
      this.vsStatus[index] = false;
    } else {
      this.vsStatus[index] = undefined;
    }

    localStorage.setItem(this.statusKey, JSON.stringify(this.vsStatus));
  }
}
