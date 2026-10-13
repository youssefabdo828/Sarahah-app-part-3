import { hash } from "argon2";
import { encrypt } from '../../Utils/Security/encryption.security.js';
import { compareTwoHashes } from "../../Utils/Security/hash.security.js";
import UserRepository from "../../DB/Repositories/user.repository.js";
import { BadRequestException, ConflictException } from "../../Utils/Errors/exception.error.js";
import envConfig from "../../Config/env.config.js";
import { generateToken } from "../../Utils/Security/token.utils.js";

const userRepo = new UserRepository()

const {user: userEnvConfig, admin: adminEnvConfig} = envConfig.jwt

export const registerUser = async (body) => {
  const { firstName, lastName, email, password, gender, age, phone } = body

  const existingUser = await userRepo.findUserByEmail(email);
  if (existingUser) {
    throw new ConflictException('User with this email already exists', { duplicatedEmail: email }, 'EMAIL_CONFLICT');
  }

  let encryptPhone;
  if (phone) encryptPhone = encrypt(phone)

  const hashedPassword = await hash(password)

  return userRepo.createNewDocument({ firstName, lastName, email, password: hashedPassword, gender, age, phoneNumber: encryptPhone || undefined })
}

export const login = async (body) => {

  const { email, password } = body

  const isEmailExist = await userRepo.findUserByEmail(email)
  if (!isEmailExist) throw new BadRequestException('Invalid email or password', null, 'UNAUTHORIZED')

  const isPasswordMatched = await compareTwoHashes(isEmailExist.password, password)
  if (!isPasswordMatched) throw new BadRequestException('invalid email or password', null, 'UNAUTHORIZED')

  const accessToken = generateToken({ _Id: isEmailExist._id, email: isEmailExist.email, role: isEmailExist.role }, userEnvConfig.accessTokenSecret, { expiresIn: userEnvConfig.accessTokenExpiresIn });
  return { message: 'login successful', accessToken }
};
