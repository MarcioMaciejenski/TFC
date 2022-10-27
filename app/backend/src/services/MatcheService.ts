import TeamModel from '../database/models/TeamModel';
import MatcheModel from '../database/models/MatcheModel';
import IMatche, { ICreateMatche } from '../interfaces/IMatche.interface';

export default class Matche {
  private model = MatcheModel;
  private _model = TeamModel;

  public async getAll(): Promise<MatcheModel[] | IMatche[]> {
    const allMatches = await this.model.findAll({
      include: [
        {
          model: TeamModel,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: TeamModel,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return allMatches;
  }

  public async getInProgress(queryValue: string): Promise<MatcheModel[] | IMatche[]> {
    let value = 0;
    if (queryValue === 'true') {
      value = 1;
    }
    const matchesInProgress = await this.model.findAll({
      where: { inProgress: value },
      include: [{ model: TeamModel, as: 'teamHome', attributes: { exclude: ['id'] },
      },
      {
        model: TeamModel, as: 'teamAway', attributes: { exclude: ['id'] },
      },
      ],
    });
    return matchesInProgress;
  }

  private async verifyTeams(teams: number[]): Promise<TeamModel | null> {
    const existsHomeTeam = await this._model.findByPk(teams[0]);
    if (existsHomeTeam === null) return existsHomeTeam;
    const existsAwaitTeam = await this._model.findByPk(teams[1]);
    if (existsAwaitTeam === null) return existsAwaitTeam;
    return existsAwaitTeam;
  }

  public async create(matche: ICreateMatche): Promise<ICreateMatche | null> {
    const { homeTeam, awayTeam } = matche;
    const verifyExists = await this.verifyTeams([homeTeam, awayTeam]);
    if (verifyExists) {
      const newMatche = await this.model.create({ ...matche });
      return newMatche;
    }
    return verifyExists;
  }

  private async existsIdMatche(id: string): Promise<MatcheModel | null> {
    const verifyId = await this.model.findByPk(id);
    return verifyId;
  }

  public async finishMatche(id: string): Promise<number | null> {
    const existId = await this.existsIdMatche(id);
    if (existId === null) {
      return existId;
    }
    const [endMatch] = await this.model.update({ inProgress: false }, { where: { id } });
    return endMatch;
  }

  public async updateMatcheScore(
    id: string,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<number> {
    const [updateScore] = await this.model
      .update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return updateScore;
  }
}
