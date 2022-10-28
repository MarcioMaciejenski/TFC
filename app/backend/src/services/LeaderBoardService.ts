import sequelize from '../database/models';
import leardBoardHome from '../utils/Querys';
import ILeaderBoardHome from '../interfaces/ILeaderBoardHome';

export default class LeaderBoard {
  private model = sequelize;

  public async getAllHomeTeams(): Promise<ILeaderBoardHome[] | unknown> {
    const [homeTeamRanking] = await this.model.query(leardBoardHome.leaderBoardHome);
    return homeTeamRanking;
  }
}
