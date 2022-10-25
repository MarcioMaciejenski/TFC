import TeamModel from '../database/models/TeamModel';
import ITeam from '../interfaces/ITeam.interface';

export default class Team {
  private model = TeamModel;

  public async getAll(): Promise<ITeam[]> {
    const allTeams = await this.model.findAll();
    return allTeams;
  }
}
