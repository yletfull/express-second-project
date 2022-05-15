/* eslint-disable class-methods-use-this */
const ApiError = require('../../error/ApiError');
const { Role, Basket } = require('../../models');

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

  async createBasketItem(req, res, next) {
    try {
      const sessionID = req.sessionID || null;
      const basket = await Basket.create({
        sessionID,
      });
      return res.status(200).json(basket);
    } catch (err) {
      return next(ApiError.badRequest(err));
    }
  }

  async getBasketItems(req, res, next) {
    const sessionId = req?.currentSession || null;
    const userId = req?.user?.id || null;
    const basket = await Basket.findOne({
      where: {
        sessionId,
      },
    });
    try {
      if (!basket) {
        const newBasket = await Basket.create({
          sessionId,
          userId,
        });
        return res.status(200).json(newBasket);
      }
      return res.status(200).json(basket);
    } catch (err) {
      return next(ApiError.badRequest(err));
    }
  }
}

module.exports = new BasketController();
