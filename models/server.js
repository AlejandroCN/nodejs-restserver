const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.connectDB();

    this.middlewares();
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json())
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use('/api/usuarios', require('../routes/usuarios'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor escuchando en puerto ${this.port}`);
    });    
  }

}

module.exports = Server;