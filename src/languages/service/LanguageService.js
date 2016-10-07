//@flow
import Language from 'models/Language';

export default class LanguageService {
  async all() {
    return Language.forge().fetchAll();
  }
}
