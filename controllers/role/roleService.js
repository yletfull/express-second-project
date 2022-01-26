const { Role } = require('../../models');

async function getRoleByParams(params) {
  try {
    const role = await Role.findOne({ where: { ...params } });
    return role;
  } catch (err) {
    return {};
  }
}

module.exports = {
  getRoleByParams,
};
