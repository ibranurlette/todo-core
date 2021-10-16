import * as bcrypt from 'bcrypt';

export const MyBcrypt = {
  encrypt: async (value: string): Promise<string> => {
    const result = await bcrypt.hash(value, 10);
    return result;
  },

  check: async (plainValue: string, hashValue: string): Promise<boolean> => {
    const result = await bcrypt.compare(plainValue, hashValue);
    return result;
  },
};
