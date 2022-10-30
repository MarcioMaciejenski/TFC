import { INTEGER, Model, BOOLEAN } from 'sequelize';
import db from '.';
import TeamModel from './TeamModel';

class Matche extends Model {
  readonly id!: number;
  public homeTeam: number;
  public homeTeamGoals: number;
  public awayTeam: number;
  public awayTeamGoals: number;
  public inProgress: number;
}

Matche.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    homeTeam: {
      type: INTEGER,
      allowNull: false,
    },
    homeTeamGoals: {
      type: INTEGER,
      allowNull: false,
    },
    awayTeam: {
      type: INTEGER,
      allowNull: false,
    },
    awayTeamGoals: {
      type: INTEGER,
      allowNull: false,
    },
    inProgress: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
    underscored: true,
  },
);

Matche.belongsTo(TeamModel, {
  foreignKey: 'homeTeam',
  as: 'teamHome',
});

Matche.belongsTo(TeamModel, {
  foreignKey: 'awayTeam',
  as: 'teamAway',
});

export default Matche;
