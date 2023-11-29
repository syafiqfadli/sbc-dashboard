export class FixtureModel {
  fixture: number;
  teamA: string[];
  teamB: string[];

  constructor(fx: number, tA: string[], tB: string[]) {
    this.fixture = fx;
    this.teamA = tA;
    this.teamB = tB;
  }
}
