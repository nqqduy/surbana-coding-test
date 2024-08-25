export class SuccessResponse {
  static call(data: null | any = null, message = 'Successfully') {
    return {
      result: true,
      message,
      data,
    };
  }
}
