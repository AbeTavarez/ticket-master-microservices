import { scrypt, randomBytes } from "node:crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export class Password {
    /**
     * @description Hashes Password
     * @param password 
     * @returns hashed password with salt
     */
  static async toHash(password: string) {
    // create salt
    const salt = randomBytes(8).toString("hex");

    // hash the password using the salt
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString("hex")}.${salt}}`;
  }

  /**
   * @description Compares stored password with the supplied password
   * @param storedPassword 
   * @param suppliedPassword 
   * @returns 
   */
  static async compare(storedPassword: string, suppliedPassword: string) {
    // split the hashed password and the salt
    const [hashedPassword, salt] = storedPassword.split('.');

    // hash the provided password
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    // compare hashes
    return buf.toString('hex') === hashedPassword;
  }
}
