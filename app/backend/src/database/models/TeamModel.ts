import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class Team extends Model {
  readonly id!: number;
  public teamName: string;
}

Team.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    teamName: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'teams',
    timestamps: false,
    underscored: true,
  },
);

export default Team;
