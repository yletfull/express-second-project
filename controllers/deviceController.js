/* eslint-disable class-methods-use-this */
const uuid = require('uuid');
const path = require('path');
const { Device } = require('../models');
const ApiError = require('../error/ApiError');

class DeviceController {
  async create(req, res, next) {
    try {
      const {
        name, price, brandId, typeId,
      } = req.body;

      const { img } = req.files;
      const fileName = `${uuid.v4()}.jpg`;
      img.mv(path.resolve(__dirname, '..', 'static', fileName));
      const device = await Device.create({
        name, price, brandId, typeId, img: fileName,
      });

      // if (info) {
      //   info = JSON.parse(info);
      //   info.forEach((i) => DeviceInfo.create({
      //     title: i.title,
      //     description: i.description,
      //     deviceId: device.id,
      //   }));
      // }

      return res.json(device);
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const {
      brandId, typeId, limit = 10, currentPage = 1,
    } = req.query;

    const offset = currentPage * limit - limit;

    let brands = null;
    if (!brandId && !typeId) {
      brands = await Device.findAll({ limit, offset });
    }
    if (brandId && !typeId) {
      brands = await Device.findAll({ where: { brandId }, limit, offset });
    }
    if (!brandId && typeId) {
      brands = await Device.findAll({ where: { typeId }, limit, offset });
    }
    if (brandId && typeId) {
      brands = await Device.findAll({ where: { brandId, typeId }, limit, offset });
    }
    return res.status(200).json(brands);
  }

  async getOne(req, res) {
    return res.status(200).json({ message: 'ок' });
  }
}

module.exports = new DeviceController();
