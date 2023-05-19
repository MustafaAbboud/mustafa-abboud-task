import { hash, compare } from 'bcryptjs';

//hashes a password to securly send to the database
export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

//compares if a user input password equals the password stored in the database
export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}