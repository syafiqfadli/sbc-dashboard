import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StatisticComponent } from './pages/statistic/statistic.component';
import { PodiumComponent } from './pages/podium/podium.component';
import { FixtureComponent } from './pages/fixture/fixture.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'podium', component: PodiumComponent },
  { path: 'statistic', component: StatisticComponent },
  { path: 'fixture', component: FixtureComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
