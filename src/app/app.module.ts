import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BronzeCrownComponent } from './components/crown/bronze-crown/bronze-crown.component';
import { GoldCrownComponent } from './components/crown/gold-crown/gold-crown.component';
import { SilverCrownComponent } from './components/crown/silver-crown/silver-crown.component';
import { AuthComponent } from './components/dialog/auth/auth.component';
import { EditTableComponent } from './components/dialog/edit-table/edit-table.component';
import { GenerateFixtureComponent } from './components/dialog/generate-fixture/generate-fixture.component';
import { LoadingComponent } from './components/dialog/loading/loading.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PlayerRankComponent } from './components/player-rank/player-rank.component';
import { FixtureComponent } from './pages/fixture/fixture.component';
import { HomeComponent } from './pages/home/home.component';
import { PodiumComponent } from './pages/podium/podium.component';
import { StatisticComponent } from './pages/statistic/statistic.component';
import { MessageComponent } from './components/dialog/message/message.component';

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
    LoadingComponent,
    MessageComponent,
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
    MatProgressSpinnerModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
