class CustomError extends Error {
    constructor(message) {
      super(message || '알 수 없는 에러입니다.');
      this.message = message
    }
  }
  
  module.exports = { CustomError };
  