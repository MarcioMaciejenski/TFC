import TeamModel from '../database/models/TeamModel';
import MatcheModel from '../database/models/MatcheModel';
import IMatche, { ICreateMatche } from '../interfaces/IMatche.interface';

export default class Matche {
  private model = MatcheModel;

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

  public async create(matche: ICreateMatche): Promise<ICreateMatche> {
    const newMatche = await this.model.create({ ...matche });
    return newMatche;
  }
}
