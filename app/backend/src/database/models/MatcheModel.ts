import { INTEGER, Model, TINYINT } from 'sequelize';
import db from '.';
import TeamModel from './TeamModel';

class Matche extends Model {
  id!: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: number;
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
      type: TINYINT,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
    underscored: true,
  },
);

Matche.hasMany(TeamModel, {
  sourceKey: 'homeTeam',
  foreignKey: 'id',
  as: 'teamHome',
});

Matche.hasMany(TeamModel, {
  sourceKey: 'awayTeam',
  foreignKey: 'id',
  as: 'teamAway',
});

export default Matche;
