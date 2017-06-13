import User from 'users/models/User';
import { logInfo } from 'logging';
var generator = require('generate-password');

const withRelated = ['nationality', 'addresses', 'telephones', 'role', 'subscription'];

export default class UserService {

  async signup(userInfo) {
    const telephones = userInfo.telephones || [];
    const addresses = userInfo.addresses || [];

    logInfo(`Attempting to register new user: ${ userInfo.firstName } ${ userInfo.lastName}`);
    return await User.forge(userInfo)
      .save()
      .tap((user) => {
        const userId = user.get('id');
        const promises = telephones.map((telephone) => user.related('telephones').create(Object.assign(telephone, { userId })))
          .concat(addresses.map((address) => user.related('addresses').create(Object.assign(address, { userId }))));
        return Promise.all(promises);
      });
  }

  async all() {
    logInfo('Fetching all users');
    return await User.fetchAll({required: false, withRelated});
  }

  async get({ id }) {
    logInfo(`Fetching user with id: ${id}`);
    return await User.where({id}).fetch({require: false, withRelated});
  }

  async getByEmail(email) {
    logInfo(`Fetching user with email: ${email}`);
    return await User.where({email}).fetch({require: false, withRelated});
  }

  async resetPassword(payload) {
    const email = payload.email;
    const user = await this.getByEmail(email);

    if (user == null) {
      return null;
    }

    const password = generator.generate({
      length: 10,
      numbers: true
    });
    logInfo(`resetting password for user with email: ${email}`);
    user.set('password', password);
    user.hashPasswordFromReset();
    await user.save();
    return {
            "user": user, 
            "password": password
          };
  }

  async updatePasswordFromReset({ params, payload }) {
    const { id } = params;
    const newPassword = payload.newPassword;
    logInfo(`Updating user with id: ${id} and params ${payload}`);
    const user = await this.get({id: id});
    user.set('password', newPassword);
    user.hashPasswordFromReset();
    await user.save();
  }

  async update({ params, payload }) {
    const { id } = params;
    logInfo(`Updating user with id: ${id} and params ${payload}`);
    const user = await this.get(params);
    return await user.save(payload, {patch: true});
  }

 async changeRole(userId: string, role: Role) {
   const user = await User.where({ id: userId }).fetch({withRelated: 'role'});
   user.set('roleId', role.get('id'));
   return await user.save();
 }
}
