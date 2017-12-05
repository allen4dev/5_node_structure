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
    return Promise.resolve(this.db);
  }

  async saveArtist(name) {
    // const conn = await this.db;

    if (!this.connected) return Promise.reject(new Error('not connected'));

    let artist;

    try {
      artist = await Artist.create({ name });
    } catch (error) {
      return Promise.reject(
        new Error('Error creating the artist', error.message)
      );
    }

    const created = await Artist.findOne({ name });
    return Promise.resolve(created);
  }

  async getArtistByName(name) {
    if (!this.connected) return Promise.reject(new Error('not connected'));

    let artist = null;

    try {
      artist = await Artist.findOne({ name });
    } catch (error) {
      return Promise.reject(new Error('User not found'));
    }

    return Promise.resolve(artist);
  }

  disconnect() {
    if (!this.connected) return Promise.reject(new Error('not connected'));

    this.connected = false;

    return Promise.resolve(this.db).then(db => db.disconnect());
  }
}

module.exports = Db;
