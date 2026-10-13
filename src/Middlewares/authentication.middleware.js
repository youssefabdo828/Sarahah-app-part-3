import { tokenTypeEnum } from "../common/enum/constants.js";
import UserRepository from "../DB/Repositories/user.repository.js";
import { BadRequestException } from "../Utils/Errors/exception.error.js";
import { decodeToken } from "../Utils/Security/token.utils.js";


const userRepo = new UserRepository();


export const authenticate = async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        throw new BadRequestException("Authorization header is missing");
    }

    const [prefix, token] = authorization.split(" ");
    if (prefix !== "Bearer" || !token) {
        throw new BadRequestException("Invalid authorization header format");
    }

    const user = await decodeToken(token, tokenTypeEnum.ACCESS_TOKEN);

    req.authUser = user;
    next();
};