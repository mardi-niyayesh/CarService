import {hash, compare} from "bcrypt";
import {createHash} from "node:crypto";

export async function hashSecret(
  value: string,
  saltRounds: number = 12
): Promise<string> {
  return await hash(value, saltRounds);
}

export async function compareSecret(
  value: string,
  hashed: string
): Promise<boolean> {
  return await compare(value, hashed);
}

export function hashSecretToken(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

export function compareSecretToken(rawToken: string, hashedToken: string): boolean {
  return hashSecretToken(rawToken) === hashedToken;
}