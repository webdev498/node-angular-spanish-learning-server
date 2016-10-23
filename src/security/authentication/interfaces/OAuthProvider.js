export type AccountDetails = {
  email: string;
  firstName: string;
  lastName: string;
};

export interface OAuthProvider {
  getProfile(code: string): AccountDetails
}
