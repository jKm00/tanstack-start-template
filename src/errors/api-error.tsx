export class ApiError {
  _type: string;
  _message: string;

  constructor(type: string, message: string) {
    this._type = type;
    this._message = message;
  }

  get type() {
    return this._type;
  }

  get message() {
    return this._message;
  }
}
