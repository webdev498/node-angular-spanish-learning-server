//@flow
import Language from 'languages/models/Language';

export default class LanguageService {
  async all() {
    return Language.forge().fetchAll();
  }
}
