'use strict';

const { Db: MDb, Server } = require('mongodb');
const mongoose = require('mongoose');

const Artist = require('./models/Artist');

const defaults = {
  host: 'mongodb://localhost',
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

  async connect() {
    // const db = new MDb(this.dbName, new Server(this.host, this.port));
    this.db = mongoose.connect(`${this.host}:${this.port}/${this.dbName}`);

    this.connected = true;
    // this.db = db.open();
  }

  async saveArtist(name) {
    const conn = await this.db;

    if (!this.connected) return Promise.reject(new Error('not connected'));

    return Artist.create({ name });
  }

  disconnect() {
    if (!this.connected) return Promise.reject(new Error('not connected'));

    this.connected = false;

    return Promise.resolve(this.db).then(db => db.disconnect());
  }
}

module.exports = Db;
