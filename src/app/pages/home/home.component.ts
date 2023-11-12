import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditTableComponent } from '../../components/dialog/edit-table/edit-table.component';
import { AuthComponent } from 'src/app/components/dialog/auth/auth.component';
import { PlayerService } from 'src/app/@core/services/player.service';
import { PlayerModel } from 'src/app/@core/models/player.model';
import { StringHelper } from 'src/app/@core/utils/helpers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  players: Array<PlayerModel>;
  slides: Array<string>;
  currentIndex = 0;
  lastUpdate: string;

  constructor(
    private dialog: MatDialog,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.playerService.getPlayerList();

    this.playerService.playersObserver().subscribe((data) => {
      if (data) {
        this.players = data;

        this.players = this.players.sort(this.sortPlayer);
        this.getLatestDate();
      }
    });

    this.slides = [
      '/assets/match/1.jpg',
      '/assets/match/2.jpg',
      '/assets/match/3.jpg',
      '/assets/match/4.jpg',
    ];

    setInterval(() => this.nextSlide(), 5000);
  }

  editTable() {
    const dialogRef = this.dialog.open(AuthComponent);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.dialog.open(EditTableComponent, {
          height: '40%',
          width: '90%',
        });
      }
    });
  }

  capitalizeName(name: string) {
    return StringHelper.capitalizeFirst(name);
  }

  get transformValue(): string {
    return `-${this.currentIndex * 100}%`;
  }

  private nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  private getLatestDate() {
    const updatedPlayer = this.players.reduce((next, current) => {
      const updatedAtDate = new Date(current.updatedAt).getTime();

      if (
        !isNaN(updatedAtDate) &&
        (!next || updatedAtDate > new Date(next.updatedAt).getTime())
      ) {
        return current;
      } else {
        return next;
      }
    }, null);

    if (updatedPlayer) {
      const formattedDate = new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(new Date(updatedPlayer.updatedAt));

      this.lastUpdate = formattedDate;
    }
  }

  private sortPlayer(a: PlayerModel, b: PlayerModel) {
    if (a.points !== b.points) {
      return b.points - a.points;
    }

    return a.name.localeCompare(b.name);
  }
}
