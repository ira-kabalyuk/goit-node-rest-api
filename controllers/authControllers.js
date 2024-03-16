import * as authService from "../services/authServises.js";
import {userSignupSchema, userSigninSchema } from "../schemas/userSchemas.js"

import HttpError from "../helpers/HttpError.js"

export const signup = async (req, res) => {
  const newUser = await authService.signup(req.body);  

  res.status(201).json({
    password: newUser.password,
    email: newUser.email,
  })
}

