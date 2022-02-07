const { User } = require('../../models');

async function getUserByParams(params) {
  try {
    const item = await User.findOne({ where: { ...params } });

    return item;
  } catch (err) {
    return {};
  }
}

module.exports = {
  getUserByParams,
};
