class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(message = 'Ошибка сервера') {
    return new ApiError(404, message);
  }

  static internal(message = 'Внутренняя ошибка сервера') {
    return new ApiError(500, message);
  }

  static forbidden(message = 'Нет доступа') {
    return new ApiError(403, message);
  }

  static unAuthorized(message = 'Пользователь не авторизован') {
    return new ApiError(401, message);
  }

  static gatewayTimeout(message = 'Gateway timeout') {
    return new ApiError(401, message);
  }
}

module.exports = ApiError;
