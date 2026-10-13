import { Router } from "express";
import * as userService from "./user.service.js";
import * as validators from "./user.validation.js";
import { validation } from "../../Middlewares/validation.middleware.js";
import { authenticate } from "../../Middlewares/authentication.middleware.js";
import { authorize } from "../../Middlewares/authorization.middleware.js";
import { roleEnum } from "../../common/enum/constants.js";

const userController = Router();

userController.get("/profile", authenticate, authorize([roleEnum.USER, roleEnum.ADMIN]), validation(validators.getUserProfile), async (req, res) => {
  const result = await userService.getUserProfile(req.authUser);
  res.status(200).json({ status: "User profile retrieved successfully", data: result });
});

userController.get("/all", validation(validators.getAllUsers), async (req, res) => {
  const result = await userService.getAllUsers();
  res.status(200).json({ status: "Users retrieved successfully", data: result });
});

userController.patch("/update", authenticate, authorize([roleEnum.ADMIN, roleEnum.USER]), validation(validators.updateUser), async (req, res) => {
  const result = await userService.updateUserProfile(req.authUser._id, req.validate.body);
  res.status(200).json({ status: "User updated successfully", data: result });
});

userController.delete("/delete", authenticate, authorize([roleEnum.ADMIN]), validation(validators.deleteUser), async (req, res) => {
  const result = await userService.deleteProfile(req.authUser._id);
  res.status(200).json({ status: "User deleted successfully", data: result });
});

export default userController;