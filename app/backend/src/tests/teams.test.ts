import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { request } from 'express';

chai.use(chaiHttp);
const { expect } = chai;

const allTeams = [
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  },
  {
    "id": 4,
    "teamName": "Corinthians"
  },
  {
    "id": 5,
    "teamName": "Cruzeiro"
  },
  {
    "id": 6,
    "teamName": "Ferroviária"
  },
  {
    "id": 7,
    "teamName": "Flamengo"
  },
  {
    "id": 8,
    "teamName": "Grêmio"
  },
  {
    "id": 9,
    "teamName": "Internacional"
  },
  {
    "id": 10,
    "teamName": "Minas Brasília"
  },
  {
    "id": 11,
    "teamName": "Napoli-SC"
  },
  {
    "id": 12,
    "teamName": "Palmeiras"
  },
  {
    "id": 13,
    "teamName": "Real Brasília"
  },
  {
    "id": 14,
    "teamName": "Santos"
  },
  {
    "id": 15,
    "teamName": "São José-SP"
  },
  {
    "id": 16,
    "teamName": "São Paulo"
  }
]

const team = {
  "id": 5,
  "teamName": "Cruzeiro"
}

describe('Testes da rota /teams', () => {
  it('Rota GET /teams retorna todos os times',async () => {
    const httpResponse = await chai.request(app).get('/teams');
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(allTeams);
  });
  it('Rota GET /teams/:id retorna um time',async () => {
    const httpResponse = await chai.request(app).get('/teams')
    .send(request.params.id);
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(team);
  });
})