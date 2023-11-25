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
  constructor(
    private dialog: MatDialog,
    private fixtureService: FixtureService
  ) {}

  ngOnInit(): void {
    this.fixtureService.fixturesObserver().subscribe((data) => {
      this.fixtures = data;
    });

    console.log(this.fixtures);
  }

  openFixture() {
    this.dialog.open(GenerateFixtureComponent, {
      width: window.screen.width > 600 ? '400px' : '100%',
    });
  }

  capitalizeName(name: string) {
    return StringHelper.capitalizeFirst(name);
  }
}
