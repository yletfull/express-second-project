/* eslint-disable class-methods-use-this */
const ApiError = require('../../error/ApiError');
const { Type } = require('../../models/Type');

class TypeController {
  async create(req, res) {
    const { name } = req.body;
    const type = await Type.create({ name });
    return res.status(200).json(type);
  }

  async getAll(req, res, next) {
    try {
      const types = await Type.findAll();

      return res.status(200).json(types);
    } catch (err) {
      return next(ApiError.badRequest('Типы не найдены'));
    }
  }
}

module.exports = new TypeController();
