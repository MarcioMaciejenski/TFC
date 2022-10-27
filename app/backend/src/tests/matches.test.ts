import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import MatcheModel from '../database/models/MatcheModel';
import { IGetAllMatches } from '../interfaces/IMatche.interface';
import allMatches from './mocks/allMatches';
import MatcheService from '../services/MatcheService';
import { matchesInProgressFalse, matchesInProgressTrue } from './mocks/matchesInProgress';
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
    const httpResponse = await chai.request(app).get('/matches').query('false');
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
    const httpResponse = await chai.request(app).get('/matches').query('true');
    expect(httpResponse.status).to.equal(200);
    // expect(httpResponse.body).to.deep.equal(matchesInProgressTrue);
  });
})