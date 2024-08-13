import dayjs from 'dayjs';

export const generateSignature = (encrypt: any) => {
  const passKey = process.env.API_KEY_AUTHORIZE;
  const deadline = dayjs().add(2, "minutes").unix();
  const keyGenerator = `${passKey}-${deadline}`;
  const authorizeKey = encrypt(
    `${deadline}-${+new Date()}`,
    keyGenerator
  );

  return {authorizeKey, deadline};
}
