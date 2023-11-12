import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StatisticComponent } from './pages/statistic/statistic.component';
import { RankingComponent } from './pages/ranking/ranking.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'statistic', component: StatisticComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
