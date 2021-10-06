/* eslint-disable class-methods-use-this */
const uuid = require('uuid');
const path = require('path');
const { Device, DeviceInfo } = require('../models');
const ApiError = require('../error/ApiError');
const { statics } = require('../constants/statics');

class DeviceController {
  async create(req, res, next) {
    try {
      const {
        name, price, brandId, typeId, info,
      } = req.body;

      const { img } = req.files;
      const extention = path.extname(img.name).substr(1);
      const fileName = `${uuid.v4()}.${extention}`;
      img.mv(path.resolve(__dirname, statics.general, fileName));
      const device = await Device.create({
        name, price, brandId, typeId, img: fileName,
      });

      if (info) {
        JSON.parse(info).forEach((i) => DeviceInfo.create({
          title: i.title,
          description: i.description,
          deviceId: device.id,
        }));
      }

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
      brands = await Device.findAndCountAll({ limit, offset });
    }
    if (brandId && !typeId) {
      brands = await Device.findAndCountAll({ where: { brandId }, limit, offset });
    }
    if (!brandId && typeId) {
      brands = await Device.findAndCountAll({ where: { typeId }, limit, offset });
    }
    if (brandId && typeId) {
      brands = await Device.findAndCountAll({ where: { brandId, typeId }, limit, offset });
    }
    return res.status(200).json(brands);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: 'info' }],
    });
    return res.status(200).json(device);
  }
}

module.exports = new DeviceController();
