const usersRoles = {
  admin: 'ADMIN',
  user: 'USER',
  guest: 'GUEST',
};

const usersRolesIds = {
  [usersRoles.admin]: 3,
  [usersRoles.user]: 2,
  [usersRoles.guest]: 1,
};

const usersRolesTitles = {
  [usersRoles.admin]: 'Администратор',
  [usersRoles.user]: 'Пользователь',
  [usersRoles.guest]: 'Гость',
};

module.exports = {
  usersRoles,
  usersRolesTitles,
  usersRolesIds,
};
