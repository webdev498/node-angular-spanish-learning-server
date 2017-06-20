export default class RequestError {
  constructor(request, originalError ) {
    this.uri = `${ request.method.toUpperCase() } ${ request.path }`;
    this.isError = true;
    this._parseRequest(request);
    if (originalError) {
      const { message, stack, constructor } = originalError;
      this.sourceError = { message, stack, name: constructor.name };
    }
  }

  toJSON() {
    const { uri, sourceError, message, name } = this;
    return {
      name,
      message,
      uri,
      sourceError: {
        name: sourceError && sourceError.name || 'Unknown',
        message: sourceError && sourceError.message || 'Unknown'
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
