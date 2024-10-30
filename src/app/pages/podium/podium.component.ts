import { Component, OnInit } from '@angular/core';
import { PlayerModel } from 'src/app/@core/models/player.model';
import { PlayerService } from 'src/app/@core/services/player.service';

@Component({
  selector: 'app-podium',
  templateUrl: './podium.component.html',
  styleUrls: ['./podium.component.scss'],
})
export class PodiumComponent implements OnInit {
  players: Array<PlayerModel>;

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.playerService.getPlayerList();

    this.playerService.playersObserver().subscribe((data) => {
      if (data) {
        this.players = data;

        this.players = this.players.sort(this.sortPlayer);
      }
    });
  }

  filteredPlayers() {
    const filteredPlayer = this.players.filter((_, index) => index !== 0);

    return filteredPlayer;
  }

  private sortPlayer(a: PlayerModel, b: PlayerModel) {
    if (a.points !== b.points) {
      return b.points - a.points;
    }

    return a.name.localeCompare(b.name);
  }
}
