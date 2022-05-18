const { Role } = require('./Role');
const { RolePermission } = require('./RolePermission');
const { Basket } = require('./Basket');
const { BasketDevice } = require('./BasketDevice');
const { Device } = require('./Device');
const { Brand } = require('./Brand');
const { Rating } = require('./Rating');
const { TypeBrand } = require('./TypeBrand');
const { DeviceInfo } = require('./DeviceInfo');
const { User } = require('./User');
const { Type } = require('./Type');
const { DeviceFeedback } = require('./DeviceFeedback');
const { Session } = require('./Session');

Basket.belongsTo(Session);
Basket.belongsTo(User);
Basket.hasMany(BasketDevice);

BasketDevice.belongsTo(Basket);
BasketDevice.belongsTo(Device);

Brand.hasMany(Device);
Brand.belongsToMany(Type, { through: TypeBrand });

Device.belongsTo(Type);
Device.belongsTo(Brand);
Device.hasMany(Rating);
Device.hasMany(BasketDevice);
Device.hasMany(DeviceInfo, { as: 'info' });
Device.hasMany(DeviceFeedback, { as: 'feedback' });

DeviceInfo.belongsTo(Device);

DeviceFeedback.belongsTo(Device);
DeviceFeedback.belongsTo(User);
DeviceFeedback.belongsTo(Rating);

Rating.belongsTo(User);
Rating.belongsTo(Device);
Rating.hasMany(DeviceFeedback);

Role.hasMany(User);
Role.hasMany(RolePermission);

RolePermission.belongsTo(Role);

Type.hasMany(Device);
Type.belongsToMany(Brand, { through: TypeBrand });

User.belongsTo(User);
User.hasOne(Session);
User.hasOne(Basket);
User.hasMany(Rating);
User.hasMany(DeviceFeedback);

Session.hasOne(Basket);
Session.belongsTo(User);

module.exports = {
  Role,
  RolePermission,
  Basket,
  BasketDevice,
  Device,
  Brand,
  Rating,
  TypeBrand,
  DeviceInfo,
  Session,
};
