class Status {
  constructor() {
    this.environment = {};
    this.environment.application = "CGI SHE";
  }

  toJSON(){
    return this.environment;
  }
}

export default Status;
