import uuid from 'uuid';

export const v4 = () => {
  return uuid.v4();
};

export type UUID = string;
