/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
const uuid = require('uuid');
const { Op } = require('sequelize');
const path = require('path');
const ApiError = require('../../error/ApiError');
const { statics } = require('../../constants/statics');
const { Device, DeviceInfo } = require('../../models');
const { ratings } = require('../../constants/ratings');

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
      limit = 10, page = 1, type, rating, price, brands = [],
    } = req.query;

    const offset = page * limit - limit;
    const where = {
      typeId: type || {
        [Op.not]: null,
      },
      rating: rating || {
        [Op.not]: null,
      },
      brandId: {
        [Op.or]: brands,
      },
      price: {
        [Op.and]: {
          [Op.gte]: price?.from || 0,
          [Op.lte]: price?.to || Number.MAX_SAFE_INTEGER,
        },
      },
      // include: {
      //   model: DeviceInfo,
      //   as: 'info',
      // },
    };
    const query = { where, limit, offset };

    try {
      const filteredBrands = await Device.findAndCountAll(query);
      return res.status(200).json(filteredBrands);
    } catch (err) {
      return next(ApiError.badRequest('Ничего не найдено'));
    }
  }

  async getOne(req, res, next) {
    const { id } = req.params;

    try {
      const device = await Device.findOne({
        where: { id },
        include: [{ model: DeviceInfo, as: 'info' }],
      });

      return res.status(200).json(device);
    } catch (err) {
      return next(ApiError.badRequest());
    }
  }

  async removeOne(req, res, next) {
    const { id } = req.params;

    try {
      const device = await Device.destroy({
        where: {
          id,
        },
      });

      if (!device) {
        return next(ApiError.badRequest('Сущность не найдена'));
      }

      return res.status(200).json(device);
    } catch (err) {
      return next(ApiError.badRequest());
    }
  }

  getRatings(req, res) {
    return res.status(200).json(ratings.map((rating) => ({ text: rating, value: rating })));
  }
}

module.exports = new DeviceController();
