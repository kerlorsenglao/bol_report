import Aes from 'react-native-aes-crypto'

const GenerateKey = (password, salt, cost, length) =>
  Aes.pbkdf2(password, salt, cost, length);

const Encrypt = (text, key) => {
  return Aes.randomKey(16).then(iv => {
    return Aes.encrypt(text, key, iv, 'aes-256-cbc').then(cipher => ({
      cipher,
      iv,
    }));
  });
};

const Decrypt = (encryptedData, key) => {
    return Aes.decrypt(
      encryptedData.cipher,
      key,
      encryptedData.iv,
      'aes-256-cbc',
    );
  };

export {GenerateKey,Encrypt,Decrypt}