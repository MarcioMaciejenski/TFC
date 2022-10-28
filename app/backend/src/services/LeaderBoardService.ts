import sequelize from '../database/models';
import LeardBoardHome from '../utils/LearderBoardHome';
import LeaderBoardAway from '../utils/LeaderBoardAway';
import ILeaderBoard from '../interfaces/ILeaderBoard';

export default class LeaderBoard {
  private model = sequelize;

  public async getAllHomeTeams(): Promise<ILeaderBoard[] | unknown> {
    const [homeTeamRanking] = await this.model.query(LeardBoardHome);
    return homeTeamRanking;
  }

  public async getAllAwayTeams(): Promise<ILeaderBoard[] | unknown> {
    const [awayTeamRanking] = await this.model.query(LeaderBoardAway);
    return awayTeamRanking;
  }
}
