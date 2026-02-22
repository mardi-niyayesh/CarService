import {hash, compare} from "bcrypt";
import {createHash, randomBytes} from "node:crypto";

/** hashed password with bcrypt */
export async function hashSecret(
  value: string,
  saltRounds: number = 12
): Promise<string> {
  return await hash(value, saltRounds);
}

/** compare hashed password with bcrypt */
export async function compareSecret(
  value: string,
  hashed: string
): Promise<boolean> {
  return await compare(value, hashed);
}

/** generate refresh token from randomBytes */
export function generateRandomToken(): string {
  return randomBytes(64).toString("hex");
}

/** hashed refresh token on SHA256 */
export function hashSecretToken(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}