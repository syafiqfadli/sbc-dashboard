import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PlayerModel } from '../models/player.model';
import { ResponseModel } from '../models/response.model';
import { FixtureModel } from '../models/fixture.model';

@Injectable({
  providedIn: 'root',
})
export class FixtureService {
  private httpOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  private fixtures: BehaviorSubject<FixtureModel[]> = new BehaviorSubject<
    FixtureModel[]
  >([]);

  constructor(private http: HttpClient) {}

  fixturesObserver() {
    return this.fixtures;
  }

  generateFixture(players: string[]) {
    const body = {
      players: players,
    };

    const res = this.http.post(
      `${environment.apiUrl}/fixture/generate`,
      body,
      this.httpOptions
    );

    res.subscribe((data: ResponseModel) => {
      if (data.isSuccess) {
        this.fixtures.next(data.data);
      }
    });

    return res;
  }
}
