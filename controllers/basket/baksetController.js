/* eslint-disable class-methods-use-this */
const ApiError = require('../../error/ApiError');
const {
  Role,
  Basket,
  BasketDevice,
  Device,
} = require('../../models');

class BasketController {
  async create(req, res, next) {
    const { title, description } = req.body;

    try {
      const role = await Role.create({ title, description });

      return res.status(200).json(role);
    } catch (err) {
      return next(ApiError.badRequest(err));
    }
  }

  async addBasketItems(req, res, next) {
    const { items } = req.body;
    try {
      const sessionId = req?.currentSession?.id;

      if (!sessionId) {
        return next(ApiError.badRequest('Корзина не найдена'));
      }

      const basket = await Basket.findOne({
        where: {
          sessionId,
        },
      });

      const basketDevice = await BasketDevice.create({
        basketId: basket.id,
        deviceId: items[0],
      });

      if (basketDevice?.basket_devices) {
        return res.status(200).json(basketDevice.basket_devices);
      }

      return res.status(200).json([]);
    } catch (err) {
      return next(ApiError.badRequest(err));
    }
  }

  async getBasketItems(req, res, next) {
    const sessionId = req?.currentSession?.id || null;
    const userId = req?.currentSession?.userId || null;
    const basket = await Basket.findOne({
      where: {
        sessionId,
      },
      include: {
        model: BasketDevice,
        include: {
          model: Device,
        },
      },
    });
    try {
      if (!basket) {
        const newBasket = await Basket.create({
          sessionId,
          userId,
        });

        if (newBasket?.basket_devices) {
          return res.status(200).json(newBasket.basket_devices);
        }

        return res.status(200).json([]);
      }
      return res.status(200).json(basket.basket_devices);
    } catch (err) {
      return next(ApiError.badRequest(err));
    }
  }
}

module.exports = new BasketController();
