import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import MatcheModel from '../database/models/MatcheModel';
import UserModel from '../database/models/UserModel';
import MatcheService from '../services/MatcheService';

import IMatche from '../interfaces/IMatche.interface';
import IUser from '../interfaces/IUser.interface';
import { IGetAllMatches } from '../interfaces/IMatche.interface';

import allMatches from './mocks/allMatches';
import { matchesInProgressFalse, matchesInProgressTrue, matche } from './mocks/matchesInProgress';
import createMatche from './mocks/createMatche';
chai.use(chaiHttp);
const { expect } = chai;

describe('Testes da rota /matches', () => {
  before(async() => {
    sinon.stub(MatcheModel, 'findAll').resolves(allMatches as any[]);
  });
  after(() => sinon.restore());
  it('Rota GET /matches retorna todas as partidas', async () => {
    const httpResponse = await chai.request(app).get('/matches');
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(allMatches);
  });

  describe('Rota GET /matches usando query string', () => {
    before(async() => { 
      sinon.stub(MatcheService.prototype, 'getInProgress').resolves(matchesInProgressFalse as any[]);
    });
    after(() => sinon.restore());
  });
    it('quando a query string é "/matches?inProgress=false"', async () => {
    const httpResponse = await chai.request(app).get('/matches?inProgress=false');
    expect(httpResponse.status).to.equal(200);
    // expect(httpResponse.body).to.deep.equal(matchesInProgressFalse);

  });


  describe('Rota GET /matches usando query string', () => {
    before(async() => { 
      sinon.stub(MatcheService.prototype, 'getInProgress').resolves(matchesInProgressTrue as any[]);
    });
    after(() => sinon.restore());
  });
    it('quando a query string é "/matches?inProgress=true"', async () => {
    const httpResponse = await chai.request(app).get('/matches?inProgress=true');
    expect(httpResponse.status).to.equal(200);
    // expect(httpResponse.body).to.deep.equal(matchesInProgressTrue);
  });

  describe('Rota POST /matches', () => { 
    const user = { id: 1, email: "admin@admin.com", password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'};
    before(async () => {
      sinon.stub(MatcheModel, 'create').resolves(createMatche as IMatche | any);
      sinon.stub(UserModel, "findOne").resolves(user as IUser | any);
      sinon.stub(MatcheService.prototype, 'verifyTeams').resolves(true as any);
    });
    after(() => sinon.restore());
    it('quando a criação dá certo, retorna status 201', async () => {
      const responseLogin = await chai.request(app).post('/login')
      .send({email: 'admin@admin.com', password: 'secret_admin'});

      const TOKEN = responseLogin.body.token;

      const httpResponse = await chai.request(app).post('/matches')
        .send({ homeTeam: 16, awayTeam: 8, homeTeamGoals: 2, awayTeamGoals: 2})
        .set('Authorization', TOKEN);
      expect(httpResponse.status).to.equal(201);
      expect(httpResponse.body).to.deep.equal(createMatche)
    });
  })
  
  describe('Rota POST /matches', () => { 
    const user = { id: 1, email: "admin@admin.com", password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'};
    before(async () => {
      sinon.stub(MatcheModel, 'create').resolves(null as any);
      sinon.stub(UserModel, "findOne").resolves(user as IUser | any);
      sinon.stub(MatcheService.prototype, 'verifyTeams').resolves(null as any);
    });
    after(() => sinon.restore());
    it('não é permitido criar partida com time inexistente', async () => {
      const responseLogin = await chai.request(app).post('/login')
      .send({email: 'admin@admin.com', password: 'secret_admin'});

      const TOKEN = responseLogin.body.token;

      const httpResponse = await chai.request(app).post('/matches')
        .send({ homeTeam: 165, awayTeam: 8, homeTeamGoals: 2, awayTeamGoals: 2})
        .set('Authorization', TOKEN);
      expect(httpResponse.status).to.equal(404);
      expect(httpResponse.body).to.deep.equal({ message: 'There is no team with such id!'});
    });
  });

  describe('Rota POST /matches', () => {
    it('não é permitido criar partida com token inválido', async () => {
      const TOKEN = 'token';

      const httpResponse = await chai.request(app).post('/matches')
        .send({ homeTeam: 16, awayTeam: 8, homeTeamGoals: 2, awayTeamGoals: 2})
        .set('Authorization', TOKEN);
      expect(httpResponse.status).to.equal(401);
      expect(httpResponse.body).to.deep.equal({ message: 'Token must be a valid token'});
    });
  });

  describe('Rota POST /matches/:id', () => {
    before(async () => {
      sinon.stub(MatcheModel, 'update').resolves([1] as number | any);
    });
    after(() => sinon.restore());
    it('é possível atualizar partidas em andamento', async () => {
      const httpResponse = await chai.request(app).patch('/matches/45')
        .send({ homeTeamGoals: 3, awayTeamGoals: 1});
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.deep.equal({ message: 'Updated score' })
    });
  });

  describe('Rota PATCH /matches/:id/finish', () => {
    before(async () => {
      sinon.stub(MatcheService.prototype, 'finishMatche').resolves([1] as number | any);
      sinon.stub(MatcheService.prototype, 'existsIdMatche').resolves(matche as IGetAllMatches | any);
    })
    after(() => sinon.restore());
    it('é possível atualizar o status "inProgress" para false', async () => {
      const httpResponse = await chai.request(app).patch('/matches/25/finish');
      console.log('httpResponse', httpResponse.body);
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.deep.equal({ message: "Finished"});
    })
  });


  describe('Rota PATCH /matches/:id/finish', () => {
    before(async () => {
      sinon.stub(MatcheService.prototype, 'finishMatche').resolves(null as undefined | any);
      sinon.stub(MatcheService.prototype, 'existsIdMatche').resolves(null as null | MatcheModel);
    })
    after(() => sinon.restore());
    it('não é possível atualizar o status "inProgress" para false de partida que não existe', async () => {
      const httpResponse = await chai.request(app).patch('/matches/652/finish');
      console.log('httpResponse', httpResponse.body);
      expect(httpResponse.status).to.equal(404);
      expect(httpResponse.body).to.deep.equal({ message: "Id matche not exists"});
    })
  });
})