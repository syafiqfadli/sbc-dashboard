import { Component, Input, OnInit } from '@angular/core';
import { PlayerModel } from 'src/app/@core/models/player.model';
import { StringHelper } from 'src/app/@core/utils/helpers';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-player-rank',
  templateUrl: './player-rank.component.html',
  styleUrls: ['./player-rank.component.scss']
})
export class PlayerRankComponent implements OnInit {
  @Input()
  player: PlayerModel;
  @Input()
  rank: number;

  imageUrl: string = "assets/icon/person.png";

  ngOnInit(): void {
    if (this.player) {
      const timestamp = new Date().getTime();
      this.imageUrl = `${environment.apiUrl}/upload/players/${this.player.name}.jpg?t=${timestamp}`;
    }
  }

  onImageError() {
    this.imageUrl = "assets/icon/person.png";
  }

  capitalizeName(name?: string) {
    return StringHelper.capitalizeFirst(name ? name : '');
  }
}
