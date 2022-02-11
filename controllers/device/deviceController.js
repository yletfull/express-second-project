/* eslint-disable class-methods-use-this */
const uuid = require('uuid');
const path = require('path');
const ApiError = require('../../error/ApiError');
const { statics } = require('../../constants/statics');
const { Device, DeviceInfo } = require('../../models');

class DeviceController {
  async create(req, res, next) {
    try {
      const {
        name, price, brandId, typeId, info,
      } = req.body;

      const {
        img,
      } = req.files;

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

  async getAll(req, res, next) {
    const {
      limit = 10, page = 1, ...filters
    } = req.query;

    const offset = page * limit - limit;

    try {
      if (filters) {
        const brands = await Device.findAndCountAll({ where: { ...filters }, limit, offset });
        return res.status(200).json(brands);
      }
      return next(ApiError.badRequest('Ничего не найдено'));
    } catch (err) {
      return next(ApiError.badRequest('Ничего не найдено'));
    }
  }

  async getOne(req, res) {
    const { id } = req.params;

    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: 'info' }],
    });

    return res.status(200).json(device);
  }

  async removeOne(req, res, next) {
    const { id } = req.params;

    try {
      const device = await Device.destroy({
        where: {
          id,
        },
      });

      return res.status(200).json(device);
    } catch (err) {
      return next(ApiError.badRequest());
    }
  }
}

module.exports = new DeviceController();
