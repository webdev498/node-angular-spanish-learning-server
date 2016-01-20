import crypto from 'crypto';

const CRYPTO_ALGORITHM = 'sha1';
const DIGEST_TYPE = 'hex';

export const SHA1Hash = (attributes) => {
  let string = JSON.stringify(attributes);
  return crypto.createHash(CRYPTO_ALGORITHM).update(string).digest(DIGEST_TYPE);
};
