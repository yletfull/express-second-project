/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
const { Op } = require('sequelize');
const { Sequelize } = require('sequelize');
const ApiError = require('../../error/ApiError');
const { Device, DeviceInfo, Rating } = require('../../models');
const { ratings } = require('../../constants/ratings');
const { moveFile, moveFiles } = require('../../utils/filtes');
const { Type } = require('../../models/Type');
// const { Sequelize } = require('../../db');

class DeviceController {
  async create(req, res, next) {
    try {
      const {
        name, price, brandId, typeId, info,
      } = req.body;

      const {
        preview, images,
      } = req.files;

      const previewFileName = moveFile(preview);
      const imagesFilesNames = moveFiles(images);

      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        preview: previewFileName,
        images: imagesFilesNames,
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
      // rating: rating || {
      //   [Op.not]: null,
      // },
      brandId: {
        [Op.or]: brands,
      },
      price: {
        [Op.and]: {
          [Op.gte]: price?.from || 0,
          [Op.lte]: price?.to || Number.MAX_SAFE_INTEGER,
        },
      },
    };
    const include = [
      { model: Rating, as: 'ratings', attributes: ['id', 'rate'] },
    ];
    const query = {
      where, include, limit, offset,
    };

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
        include: [
          { model: DeviceInfo, as: 'info' },
          { model: Type, attributes: ['name'] },
        ],
        where: { id },
      });

      const rating = await Rating.findOne({
        attributes: [
          [Sequelize.cast(Sequelize.fn('avg', Sequelize.col('rate')), 'FLOAT'), 'value'],
          [Sequelize.cast(Sequelize.fn('count', Sequelize.col('rate')), 'INTEGER'), 'votes'],
        ],
        where: {
          deviceId: device.id,
        },
      });

      const result = {
        ...device.dataValues,
        rating,
      };

      return res.status(200).json(result);
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
