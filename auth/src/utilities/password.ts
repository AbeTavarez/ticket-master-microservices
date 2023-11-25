import { scrypt, randomBytes } from "node:crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    // create salt
    const salt = randomBytes(8).toString("hex");
    // hash the password using the salt
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString("hex")}.${salt}}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    // split the hashed password and the salt
    const [hashedPassword, salt] = storedPassword.split('.');
    // hash the provided password
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
    // compare hashes
    return buf.toString('hex') === hashedPassword;
  }
}
