import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { StatisticComponent } from './pages/statistic/statistic.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PodiumComponent } from './pages/podium/podium.component';
import { EditTableComponent } from './components/dialog/edit-table/edit-table.component';
import { AuthComponent } from './components/dialog/auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PlayerRankComponent } from './components/player-rank/player-rank.component';
import { GoldCrownComponent } from './components/crown/gold-crown/gold-crown.component';
import { SilverCrownComponent } from './components/crown/silver-crown/silver-crown.component';
import { BronzeCrownComponent } from './components/crown/bronze-crown/bronze-crown.component';
import { FooterComponent } from './components/footer/footer.component';
import { FixtureComponent } from './pages/fixture/fixture.component';
import { GenerateFixtureComponent } from './components/dialog/generate-fixture/generate-fixture.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StatisticComponent,
    NavbarComponent,
    PodiumComponent,
    EditTableComponent,
    AuthComponent,
    PlayerRankComponent,
    GoldCrownComponent,
    SilverCrownComponent,
    BronzeCrownComponent,
    FooterComponent,
    FixtureComponent,
    GenerateFixtureComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatIconModule,
    MatDialogModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
