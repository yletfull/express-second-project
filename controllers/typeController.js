/* eslint-disable class-methods-use-this */
const { Type } = require('../models');
// const ApiError = require('../error/ApiError');

class TypeController {
  async create(req, res) {
    const { name } = req.body;
    const type = await Type.create({ name });
    return res.status(200).json(type);
  }

  async getAll(req, res) {
    const types = await Type.findAll();
    return res.status(200).json(types);
  }
}

module.exports = new TypeController();
