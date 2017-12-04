'use strict';

const { Db: MDb, Server } = require('mongodb');

class Db {
  connect() {
    const db = new MDb('structure', new Server('localhost', 27017));

    this.connected = true;
    this.db = db.open();

    return Promise.resolve(this.db);
  }

  async saveTest() {
    let conn = await this.db;

    if (!this.connected) return Promise.reject(new Error('not connected'));

    console.log(conn);
    const created = await conn.insertOne({ c: 1 });
    console.log('Succesfully created the document');
    return Promise.resolve(created);
  }

  disconnect() {
    if (!this.connected) return Promise.reject(new Error('not connected'));

    this.connected = false;

    return Promise.resolve(this.db).then(db => db.close());
  }
}

module.exports = Db;
