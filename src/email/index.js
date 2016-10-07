import { logError } from './../logging';
import * as EmailService from './service';
import SignupConfirmation from './models/template/SignupConfirmation';
import Welcome from './models/template/Welcome';

export const signupConfirmation = async (user) => {
  await EmailService.send(new SignupConfirmation(user));
};

export const welcome = async (user) => {
  try {
    await EmailService.send(new Welcome(user));
  } catch(error) {
    logError(error);
  }
};