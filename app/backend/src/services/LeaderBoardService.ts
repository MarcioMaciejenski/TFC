import sequelize from '../database/models';
import LeaderBoardHome from '../utils/LeaderBoardHome';
import LeaderBoardAway from '../utils/LeaderBoardAway';
import LeaderBoardGeneral from '../utils/LeaderBoardGeneral';
import ILeaderBoard from '../interfaces/ILeaderBoard';

export default class LeaderBoard {
  private model = sequelize;

  public async getHomeRanking(): Promise<ILeaderBoard[] | unknown> {
    const [homeTeamRanking] = await this.model.query(LeaderBoardHome);
    return homeTeamRanking;
  }

  public async getAwayRanking(): Promise<ILeaderBoard[] | unknown> {
    const [awayTeamRanking] = await this.model.query(LeaderBoardAway);
    return awayTeamRanking;
  }

  public async getGeneralRanking(): Promise<ILeaderBoard[] | unknown> {
    const [generalRankingTeam] = await this.model.query(LeaderBoardGeneral);
    return generalRankingTeam;
  }
}
