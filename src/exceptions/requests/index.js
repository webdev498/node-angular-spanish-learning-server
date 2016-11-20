export default class RequestError {
  constructor(request, originalError) {
    this.originator = request.info.remoteAddress;
    this.uri = `${ request.method.toUpperCase() } ${ request.path }`;
    this.request = request.orig;
    this.sourceError = originalError;
    this.isError = true;
  }
}
