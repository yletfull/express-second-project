/* eslint-disable class-methods-use-this */
class UserController {
  async registration(req, res) {
    return res.status(200).json({ message: 'ок' });
  }

  async login(req, res) {
    return res.json('ок');
  }

  async check(req, res) {
    return res.json('ок');
  }
}

module.exports = new UserController();
