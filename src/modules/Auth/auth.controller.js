import { Router } from "express";
import * as authService from "./auth.service.js";
import  * as validators from "./auth.validation.js";
import { validation } from "../../Middlewares/validation.middleware.js";
const authController = Router();



authController.post("/register",validation(validators.signup) , async (req, res) => {
  const { firstName, lastName, email, password , gender , age , phone } = req.body;
  const result = await authService.registerUser(req.validate.body,{ firstName, lastName, email, password , gender , age , phone });
    res.status(200).json({ status: "User registered successfully" , data: result });
});




authController.post("/login",validation(validators.login) , async (req, res) => {
  const { email, password } = req.body;
    const result = await authService.login(req.validate.body,{ email, password });
    res.status(200).json({ status: "User logged in successfully", data: result });
});


export default authController;