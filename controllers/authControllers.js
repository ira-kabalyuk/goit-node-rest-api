import * as authService from "../services/authServises.js";
import jwt from 'jsonwebtoken';
import HttpError from "../helpers/HttpError.js"

const { JWT_SECRET } = process.env;

export const signup = async (req, res) => {
  const { email } = req.body;
  const user = await authService.findUser({ email });
  if (user) {
    throw HttpError(409, 'Email in use')
  }
  const newUser = await authService.signup(req.body);

  res.status(201).json({
    password: newUser.password,
    email: newUser.email,
  })
}

export const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const comparePassword = await authService.validatePassword(password, user.password);
  if (!comparePassword) {
    throw HttpError(401, "Email or password is wrong");
  }

  const { _id: id } = user;
  const payload = {
    id,
  }

  const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "23h"});

  res.json({token})
}
