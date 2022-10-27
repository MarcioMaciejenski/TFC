export interface ICreateMatche {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
}

export interface IGetAllMatches {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome: {
    teamName: string;
  }
  teamAway: {
    teamName: string
  };
}

export default interface IMatche extends ICreateMatche {
  id?: number;
  inProgress: boolean;
  teamHome: string;
  teamAway: string;
}
