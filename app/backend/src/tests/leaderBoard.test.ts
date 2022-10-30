import * as sinon from 'sinon';
import * as chai from 'chai';
//@ts-ignore
import chaiHttp = require('chai-http');
import LeaderBoardService from '../services/LeaderBoardService';
import { homeRanking, awayRanking, generalRanking } from './mocks/dataLeaderBoard';
import ILeaderBoard from '../interfaces/ILeaderBoard';
import { app } from '../app';

chai.use(chaiHttp);
const { expect } = chai;

describe('Testes da rota /leaderboard', () => {
  describe('/leaderboard/home', () => {
    before(async () => {
      sinon.stub(LeaderBoardService.prototype, 'getHomeRanking').resolves(homeRanking as ILeaderBoard[]);
    });
    after(() => sinon.restore());
    it('filtra classificação dos times da casa', async () => {
      const httpResponse = await chai.request(app).get('/leaderboard/home');
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.deep.equal(homeRanking);
    });
  });

  describe('/leaderboard/home', () => {
    before(async () => {
      sinon.stub(LeaderBoardService.prototype, 'getHomeRanking').rejects();
    });
    after(() => sinon.restore());
    it('quando da erro na requisição da rota /leaderboard/home', async () => {
      const httpResponse = await chai.request(app).get('/leaderboard/home');
      expect(httpResponse.status).to.equal(500);
      expect(httpResponse.body).to.deep.equal('Error');
    });
  });

  describe('/leaderboard/away', () => {
    before(async () => {
      sinon.stub(LeaderBoardService.prototype, 'getAwayRanking').resolves(awayRanking as ILeaderBoard[]);
    });
    after(() => sinon.restore());
    it('filtra classificação dos times visitantes', async () => {
      const httpResponse = await chai.request(app).get('/leaderboard/away');
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.deep.equal(awayRanking);
    });
  });

  describe('/leaderboard/away', () => {
    before(async () => {
      sinon.stub(LeaderBoardService.prototype, 'getAwayRanking').rejects();
    });
    after(() => sinon.restore());
    it('quando da erro na requisição da rota /leaderboard/away', async () => {
      const httpResponse = await chai.request(app).get('/leaderboard/away');
      expect(httpResponse.status).to.equal(500);
      expect(httpResponse.body).to.deep.equal('Error');
    });
  });

  describe('/leaderboard', () => {
    before(async () => {
      sinon.stub(LeaderBoardService.prototype, 'getGeneralRanking').resolves(generalRanking as ILeaderBoard[]);
    });
    after(() => sinon.restore());
    it('filtra classificação geral dos times', async () => {
      const httpResponse = await chai.request(app).get('/leaderboard');
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.deep.equal(generalRanking);
    });
  });

  describe('/leaderboard', () => {
    before(async () => {
      sinon.stub(LeaderBoardService.prototype, 'getGeneralRanking').rejects();
    });
    after(() => sinon.restore());
    it('quando da erro na requisição da rota /leaderboard', async () => {
      const httpResponse = await chai.request(app).get('/leaderboard');
      expect(httpResponse.status).to.equal(500);
      expect(httpResponse.body).to.deep.equal('Error');
    });
  });
})