import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import UserModel from '../database/models/UserModel';
import { IUser } from '../interfaces/IUser.interface';

chai.use(chaiHttp);
const { expect } = chai;

describe('Teste da rota /login', () => {
  describe('Quando o campo "email" não é informado', () => {
    it('deve retornar um status 400', async () => {
      const httpResponse = await chai.request(app).post('/login')
      .send({ password: 'secret_admin'});
      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.deep.equal({message: 'All fields must be filled'});
    });
  });

  describe('Quando o campo "password" não é informado', () => {
    it('deve retornar um status 400', async () => {
      const httpResponse = await chai.request(app).post('/login')
      .send({ email: 'admin@admin.com'});
      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.deep.equal({message: 'All fields must be filled'});
    });
  });

  describe('Quando o campo "email" está incorreto', () => {
    before(async () => {
      sinon.stub(UserModel, 'findOne').resolves(null);
    });
    after(() => sinon.restore());
    it('deve retornar um status 401', async () => {
      const httpResponse = await chai.request(app).post('/login')
      .send({email:'admin@xablau.com', password:'secret_admin'});
      expect(httpResponse.status).to.equal(401);
      expect(httpResponse.body).to.deep.equal({ message: 'Incorrect email or password'});
    });
  });

  describe('Quando o campo "password" está incorreto', () => {
    const passwordValid = 
    before(async () => {
      sinon.stub(UserModel, 'findOne').resolves(null);
    });
    after(() => sinon.restore());
    it('deve retornar um status 401', async () => {
      const httpResponse = await chai.request(app).post('/login')
      .send({email:'admin@admin.com', password:'senha_invalida'});
      expect(httpResponse.status).to.equal(401);
      expect(httpResponse.body).to.deep.equal({ message: 'Incorrect email or password'});
    });
  });
  describe('quando o login é feito com sucesso', () => {
    const user = { id: 1, email: "admin@admin.com", password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'};
    before(() => {
      sinon.stub(UserModel, "findOne").resolves(user as IUser | any)
    });
    after(() => sinon.restore());
    it('deve retorna um status 200', async () => {
      const httpResponse = await chai.request(app).post('/login')
      .send({email: 'admin@admin.com', password: 'secret_admin'});
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.have.property('token');
    });
  })
});