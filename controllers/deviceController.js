/* eslint-disable class-methods-use-this */
const uuid = require('uuid');
const path = require('path');
const { Device } = require('../models');
const ApiError = require('../error/ApiError');

class DeviceController {
  async create(req, res, next) {
    const {
      name, price, brandId, typeId, info,
    } = req.body;

    const { img } = req.files;
    const filename = `${uuid.v4}.jpg`;
    img.mv(path.resolve(__dirname, '..', 'static', filename));

    try {
      const device = await Device.create({
        name, price, brandId, typeId, img: filename, info,
      });
      return res.status(200).json(device);
    } catch (err) {
      return next(ApiError.badRequest(err.message));
    }
  }

  async getAll(req, res) {
    return res.status(200).json({ message: 'ок' });
  }

  async getOne(req, res) {
    return res.status(200).json({ message: 'ок' });
  }
}

module.exports = new DeviceController();
