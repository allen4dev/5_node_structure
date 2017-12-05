'use strict';

const { Db: MDb, Server } = require('mongodb');

const defaults = {
  host: 'localhost',
  port: 27017,
  dbName: 'structure',
};

class Db {
  constructor(options = {}) {
    this.host = options.host || defaults.host;
    this.port = options.port || defaults.port;
    this.dbName = options.dbName || defaults.dbName;
    this.connected = false;
  }

  connect() {
    const db = new MDb(this.dbName, new Server(this.host, this.port));

    this.connected = true;
    this.db = db.open();

    return Promise.resolve(this.db);
  }

  async saveTest(obj) {
    let conn = await this.db;

    if (!this.connected) return Promise.reject(new Error('not connected'));

    const created = await conn.collection('testing').insertOne(obj);

    return Promise.resolve(created);
  }

  disconnect() {
    if (!this.connected) return Promise.reject(new Error('not connected'));

    this.connected = false;

    return Promise.resolve(this.db).then(db => db.close());
  }
}

module.exports = Db;
