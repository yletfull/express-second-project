/* eslint-disable class-methods-use-this */
class UserController {
  async registration(req, res) {
    return res.status('200', { message: 'ок' });
  }

  async login(req, res) {
    return res.status('200', { message: 'ок' });
  }

  async check(req, res) {
    const { id } = req.query;
    return res.status('200', { message: id });
  }
}

module.exports = new UserController();
