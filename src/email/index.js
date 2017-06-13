import { logError } from './../logging';
import * as EmailService from './service';
import SignupConfirmation from './models/template/SignupConfirmation';
import Welcome from './models/template/Welcome';
import QuestionFeedback from './models/template/QuestionFeedback';
import ResetPassword from './models/template/ResetPassword';

export const signupConfirmation = async (user) => {
  await EmailService.send(new SignupConfirmation(user));
};

export const welcome = async (user) => {
  try {
    await EmailService.send(new Welcome(user));
  } catch(error) {
    logError(error);
    throw (error);
  }
};

export const questionFeedback = async (user, feedbackText, question, feedback) => {
  try {
    await EmailService.send(new QuestionFeedback(user, feedbackText, question, feedback));
  } catch(error) {
    logError(error);
    throw (error);
  }
};

export const resetPassword = async (user) => {
  try {
    await EmailService.send(new ResetPassword(user));
  } catch(error) {
    logError(error);
    throw (error);
  }
};