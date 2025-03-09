import crypto from "crypto";
import "server-only";

const ALG = "aes-256-cbc"; //key length is 32 bytes

export const symmetricEncrypt = (data: string) => {
  const key = process.env.ENCRYPTION_KEY;
  if (!key) throw new Error("encryption key not found");

  const iv = crypto.randomBytes(16);
  //Initialization Vector(iv) is used for even if same data is encrypted with the same secret key the output value will be different always

  const cipher = crypto.createCipheriv(ALG, Buffer.from(key, "hex"), iv);

  let encyrypted = cipher.update(data);
  encyrypted = Buffer.concat([encyrypted, cipher.final()]);

  return iv.toString("hex") + ":" + encyrypted.toString("hex");
};

export const symmetricDecrypt = (encrypted: string) => {
  const key = process.env.ENCRYPTION_KEY;
  if (!key) throw new Error("encryption key not found");

  const textParts = encrypted.split(":");
  const iv = Buffer.from(textParts.shift() as string, "hex");
  const encryptedText = Buffer.from(textParts.join(":"), "hex");
  const decipher = crypto.createDecipheriv(ALG, Buffer.from(key, "hex"), iv);

  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
};
