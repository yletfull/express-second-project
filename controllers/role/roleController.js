/* eslint-disable class-methods-use-this */
// const { roles } = require('../constants/roles');
const ApiError = require('../../error/ApiError');
const { Role } = require('../../models');

class RoleController {
  async create(req, res, next) {
    const { title, description } = req.body;
    try {
      const role = await Role.create({ title, description });
      return res.status(200).json(role);
    } catch (err) {
      return next(ApiError.badRequest(err));
    }
  }

  async getAll(req, res, next) {
    try {
      const roles = await Role.findAll();
      return res.status(200).json(roles);
    } catch (err) {
      return next(ApiError.badRequest('Роли не найдены'));
    }
  }
}

module.exports = new RoleController();
