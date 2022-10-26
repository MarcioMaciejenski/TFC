import * as express from 'express';
import UserRouter from './routes/users.routes';
import TeamRouter from './routes/teams.routes';
import MatcheRouter from './routes/matches.routes';
import ErrorHandlerMiddleware from './middlewares/ErrorHandler.middleware';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
    // Não remover essa rota
    this.app.use(UserRouter);
    this.app.use(TeamRouter);
    this.app.use(MatcheRouter);
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.use(ErrorHandlerMiddleware);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
