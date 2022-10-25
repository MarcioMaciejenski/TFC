import ErroGenerate from '../utils/ErrorGenerate';
import TeamModel from '../database/models/TeamModel';
import ITeam from '../interfaces/ITeam.interface';

export default class Team {
  private model = TeamModel;

  public async getAll(): Promise<ITeam[]> {
    const allTeams = await this.model.findAll();
    return allTeams;
  }

  public async getById(id: number): Promise<ITeam | null> {
    const team = await this.model.findByPk(id);
    if (team === null) {
      throw (new ErroGenerate('Ivalid id', 400));
    }
    return team;
  }
}
