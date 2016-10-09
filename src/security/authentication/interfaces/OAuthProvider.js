export type AccountDetails = {
  email: string;
  firstName: stirng;
  lastName: string;
}

export interface OAuthProvider {
  getProfile(code: string): AccountDetails
}
