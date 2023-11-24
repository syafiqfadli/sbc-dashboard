import { Component, Input } from '@angular/core';
import { PlayerModel } from 'src/app/@core/models/player.model';
import { StringHelper } from 'src/app/@core/utils/helpers';

@Component({
  selector: 'app-player-rank',
  templateUrl: './player-rank.component.html',
  styleUrls: ['./player-rank.component.scss']
})
export class PlayerRankComponent {
  @Input()
  player: PlayerModel;
  @Input()
  rank: number;

  capitalizeName(name?: string) {
    return StringHelper.capitalizeFirst(name ? name : '');
  }
}
