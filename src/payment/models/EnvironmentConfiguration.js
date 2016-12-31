export default class EnviromentConfiguration {
    constructor() {}

    get config() {
        return {
            'mode': process.env.NODE_ENV === 'development' ? 'sandbox' : 'live', //sandbox or live
            'client_id': process.env.PP_KEY,
            'client_secret': process.env.PP_SECRET
        };
    }
}