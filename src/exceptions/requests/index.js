export default class RequestError {
  constructor(request, originalError) {
    const { message, stack, constructor } = originalError;
    this.uri = `${ request.method.toUpperCase() } ${ request.path }`;
    this.sourceError = { message, stack, name: constructor.name };
    this.isError = true;
    this._parseRequest(request);
  }

  toJSON() {
    const { uri, sourceError, message, name } = this;
    return {
      name,
      message,
      uri,
      sourceError: {
        name: sourceError.name,
        message: sourceError.message
      }
    };
  }

  _parseRequest(req) {
    const { id, headers, info, method, params, path, payload, query } = req;
    this.request = {
      id,
      headers,
      method: method.toUpperCase(),
      path,
      params,
      query,
      payload,
      issuer: info.remoteAddress
    };
  }
}
