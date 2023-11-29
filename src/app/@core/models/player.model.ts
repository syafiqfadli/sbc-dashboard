export class PlayerModel {
  name: string;
  match: number;
  win: number;
  lose: number;
  points: number;
  updatedAt: Date;

  constructor(n: string = '', w: number = 0, l: number = 0) {
    this.name = n;
    this.win = w;
    this.lose = l;
  }
}
