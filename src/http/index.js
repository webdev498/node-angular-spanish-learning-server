export type Request = {
  payload: Object;
  params: Object;
  query: Object;
  auth: Object;
  routes: {
    settings: {
      plugins: Object
    }
  }
}

export type Server = Object;
