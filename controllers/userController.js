/* eslint-disable class-methods-use-this */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const ApiError = require('../error/ApiError');
const { User, Basket } = require('../models');

const generationJWT = ({
  id, email, login, role,
}) => jwt.sign(
  {
    id, email, login, role,
  },
  process.env.SECRET_KEY,
  { expiresIn: '24h' },
);

class UserController {
  async registration(req, res, next) {
    const {
      email, password, login, role,
    } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest('Некорректный email или пароль'));
    }

    if (!login) {
      return next(ApiError.badRequest('Логин - обязательное поле'));
    }

    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest('Пользователь с такими данными уже существует'));
    }

    try {
      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({
        email, role, login, password: hashPassword,
      });
      await Basket.create({ userId: user.id });

      const token = generationJWT({
        id: user.id,
        email: user.email,
        login: user.login,
        role: user.role,
      });
      return res.status(200).json({ token });
    } catch (err) {
      next(ApiError.badRequest(err));
    }
    return next(ApiError.badRequest('Ошибка'));
  }

  async login(req, res, next) {
    const { login = '', email = '', password } = req.body;
    const user = await User.findOne({
      where: {
        [Op.or]: [{ login }, { email }],
      },
    });
    if (!user) {
      return next(ApiError.internal('Пользователь не найден'));
    }

    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal('Указан неверный логин/пароль'));
    }

    const token = generationJWT(user.id, user.email, user.role);
    return res.status(200).json(token);
  }

  async check(req, res) {
    return res.json('ок');
  }
}

module.exports = new UserController();
