const { Brand } = require('../models');
/* eslint-disable class-methods-use-this */
class BrandController {
  async create(req, res) {
    const { name } = req.body;
    const brand = await Brand.create({ name });
    return res.status(200).json(brand);
  }

  async getAll(req, res) {
    const brands = await Brand.findAll();
    return res.status(200).json(brands);
  }
}

module.exports = new BrandController();
