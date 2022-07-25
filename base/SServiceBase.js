const { connect } = require("../connectSql");
const _ = require("lodash");
class SServiceBase {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async connectionPool() {
    this.pool = await connect;
  }

  async getAll() {
    if (!this.pool) await this.connectionPool();
    const query = `Select * from ${this.tableName}`;
    const data = await this.pool.query(query);
    return data.recordset;
  }

  async getById(id) {
    if (!this.pool) await this.connectionPool();
    const query = `Select * from ${this.tableName} where Id = ${id}`;
    const data = await this.pool.query(query);
    return data.recordset;
  }

  async delete(id) {
    if (!this.pool) await this.connectionPool();
    const query = `Delete from ${this.tableName} where Id = ${id}`;
    await this.pool.query(query);
    return await this.getById(id);
  }

  async update(object) {
    if (!this.pool) await this.connectionPool();
    const valueUpdate = this.convertDataUpdate(_.omit(object, "Id"));
    const query = `update ${
      this.tableName
    } set ${valueUpdate} where Id = ${_.get(object, "Id")}`;
    await this.pool.query(query);
    return await this.getById(_.get(object, "Id"));
  }

  async create(object) {
    if (!this.pool) await this.connectionPool();
    const fields = this.convertDataCreate(_.omit(object, "Id"), true);
    const values = this.convertDataCreate(_.omit(object, "Id"));
    const query = `insert into ${this.tableName} (${fields}) values (${values})`;
    await this.pool.query(query);
    return await this.getById(_.get(object, "Id"));
  }

  convertDataUpdate(object) {
    return Object.keys(object)
      .map((key) => {
        const value = _.isString(object[key]) ? `'${object[key]}'` : object[key];
        return `${key} = ${value}`;
      })
      .join(",");
  }

  convertDataCreate(object, field) {
    return Object.keys(object)
      .map((key) => {
        if (field) {
          return key;
        } else {
          return _.isString(object[key]) ? `'${object[key]}'` : object[key];
        }
      })
      .join(",");
  }
}
module.exports = {
  SServiceBase,
};
