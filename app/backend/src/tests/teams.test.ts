import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import TeamModel from '../database/models/TeamModel';
import allTeams from './mocks/allTeams';
import team from './mocks/team';

chai.use(chaiHttp);
const { expect } = chai;

describe('Testes da rota /teams', () => {
  before(async () => {
    sinon.stub(TeamModel, 'findAll').resolves(allTeams as TeamModel[]);
  });
  after(() => sinon.restore());
  it('Rota GET /teams retorna todos os times',async () => {
    const httpResponse = await chai.request(app).get('/teams');
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(allTeams);
  });
})

describe('Testes da rota /teams', () => {
  before(async () => {
    sinon.stub(TeamModel, 'findByPk').resolves(team as TeamModel);
  });
  after(() => sinon.restore());
  it('Rota GET /teams/:id retorna um time',async () => {
    const httpResponse = await chai.request(app).get('/teams/:id');
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(team);
  });
})