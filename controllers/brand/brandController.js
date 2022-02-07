/* eslint-disable class-methods-use-this */
const ApiError = require('../../error/ApiError');
const { Brand } = require('../../models');

class BrandController {
  async create(req, res) {
    const { name } = req.body;
    const brand = await Brand.create({ name });

    return res.status(200).json(brand);
  }

  async getAll(req, res, next) {
    try {
      const brands = await Brand.findAll();

      return res.status(200).json(brands);
    } catch (err) {
      return next(ApiError.badRequest('Бренды не найдены'));
    }
  }
}

module.exports = new BrandController();
