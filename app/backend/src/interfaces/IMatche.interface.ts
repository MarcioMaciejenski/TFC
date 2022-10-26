export interface ICreateMatche {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
}

export default interface IMatche extends ICreateMatche {
  id?: number;
  inProgress: boolean;
  teamHome: string;
  teamAway: string;
}
