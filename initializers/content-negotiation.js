//https://github.com/expressjs/body-parser
import parser from 'body-parser';

export default (application) => {
  application.use(parser.json({
    strict: true
  }));
};
