import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PlayerModel } from '../models/player.model';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private httpOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  private players: BehaviorSubject<PlayerModel[]> = new BehaviorSubject<
    PlayerModel[]
  >([]);

  constructor(private http: HttpClient) {}

  playersObserver() {
    return this.players;
  }

  getPlayerList() {
    const res = this.http.get(
      `${environment.apiUrl}/player/list`,
      this.httpOptions
    );

    res.subscribe((data: ResponseModel) => {
      if (data.isSuccess) {
        this.players.next(data.data);
      }
    });
  }

  createPlayer(playerName: string) {
    const body = {
      name: playerName,
    };

    const res = this.http.post(
      `${environment.apiUrl}/player/create`,
      body,
      this.httpOptions
    );

    return res;
  }

  updateMatch(playerList: PlayerModel[]) {
    const body = {
      playerList: playerList,
    };

    const res = this.http.post(
      `${environment.apiUrl}/player/update`,
      body,
      this.httpOptions
    );

    return res;
  }
}
