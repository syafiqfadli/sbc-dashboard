import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PlayerModel } from 'src/app/@core/models/player.model';
import { ResponseModel } from 'src/app/@core/models/response.model';
import { PlayerService } from 'src/app/@core/services/player.service';
import { StringHelper } from 'src/app/@core/utils/helpers';

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.scss'],
})
export class EditTableComponent implements OnInit {
  addForm: FormGroup;
  editForm: FormGroup;
  players: PlayerModel[];
  playerMatch: PlayerModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditTableComponent>,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.playerService.playersObserver().subscribe((data) => {
      this.players = data;
    });

    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
    });

    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      win: ['', Validators.required],
      lose: ['', Validators.required],
    });
  }

  addPlayer() {
    if (!this.addForm.valid) {
      alert('Please enter player name.');
      return;
    }

    const name = this.addForm.value['name'];
    const res = this.playerService.createPlayer(name);

    res.subscribe((data: ResponseModel) => {
      if (!data.isSuccess) {
        alert(data.message);
        return;
      }

      this.playerService.getPlayerList();
      alert(data.message);
      this.addForm.reset();
    });
  }

  addPlayerMatch() {
    if (!this.editForm.valid) {
      alert('Please fill required field.');
      return;
    }

    const win = this.editForm.value['win'];
    const lose = this.editForm.value['lose'];

    if (win === 0 && lose === 0) {
      alert('Please enter at least 1 match.');
      return;
    }

    const nameExist = this.playerMatch.some(
      (data) => data.name === this.editForm.value['name']
    );

    if (nameExist) {
      alert('Player already added.');
      return;
    }

    this.playerMatch.push(this.editForm.value);
    this.editForm.reset();
  }

  deletePlayerMatch(player: PlayerModel) {
    const playerIndex = this.playerMatch.findIndex(
      (data) => data.name === player.name
    );

    if (playerIndex !== -1) {
      this.playerMatch.splice(playerIndex, 1);
    }
  }

  updateMatch() {
    if (this.playerMatch.length === 0) {
      alert('Please add at least one player.');
      return;
    }

    const res = this.playerService.updateMatch(this.playerMatch);

    res.subscribe((data: ResponseModel) => {
      if (!data.isSuccess) {
        alert(data.message);
        return;
      }

      this.playerService.getPlayerList();
      alert(data.message);
      this.playerMatch = [];
      this.editForm.reset();
    });
  }

  capitalizeName(name: string) {
    return StringHelper.capitalizeFirst(name);
  }
}
