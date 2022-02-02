/* eslint-disable class-methods-use-this */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const ApiError = require('../../error/ApiError');
const { User, Basket } = require('../../models');
const { getUserByParams } = require('./userService');

const generateJWT = ({
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
      email, password, login,
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
        email, login, password: hashPassword, roleId: 1,
      });
      await Basket.create({ userId: user.id });

      const token = generateJWT({
        id: user.id,
        email: user.email,
        login: user.login,
        roleId: user.roleId,
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

    const token = generateJWT({
      id: user.id,
      email: user.email,
      login: user.login,
      roleId: user.roleId,
    });
    return res.status(200).json({ token });
  }

  async check(req, res) {
    const {
      id,
      email,
      login,
    } = req.user;

    const user = await getUserByParams({ id });

    const token = generateJWT({
      id,
      email,
      login,
      roleId: user.roleId,
    });

    return res.json({
      token,
      user: {
        id,
        email,
        login,
        roleId: user.roleId,
      },
    });
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await User.findAll();
      return res.status(200).json(users);
    } catch (err) {
      return next(ApiError.badRequest('Пользователи не найдены'));
    }
  }

  async setUser(req, res, next) {
    const { id } = req.params;
    const { email, login, roleId } = req.body;

    try {
      const updateUser = await User.update({
        email, login, roleId,
      }, {
        where: {
          id,
        },
      });
      return res.status(200).json(updateUser);
    } catch (err) {
      next(ApiError.badRequest(err));
    }
    return next(ApiError.badRequest('Ошибка'));
  }
}

module.exports = new UserController();
