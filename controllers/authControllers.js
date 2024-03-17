import * as authService from "../services/authServises.js";
import jwt from 'jsonwebtoken';
import HttpError from "../helpers/HttpError.js"
import {userSignupSchema, userSigninSchema } from "../schemas/userSchemas.js"

const { JWT_SECRET } = process.env;

export const signup = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await authService.findUser({ email });
    const { error } = userSignupSchema.validate(req.body);

  if (error) {
    throw HttpError(400, error.message)
  }
    
  if (user) {
    throw HttpError(409, 'Email in use')
  }
  const newUser = await authService.signup(req.body);

    res.status(201).json({
      email: newUser.email,
      password: newUser.password,      
    })
  }

 catch(error) {
    next(error)
  }  
}

export const signin = async (req, res, next) => {
  try {    
    const { email, password } = req.body;
    const user = await authService.findUser({ email });
    const { error } = userSignupSchema.validate(req.body);
     if (error) {
      throw HttpError(400, error.message)
    }
    
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }
    const comparePassword = await authService.validatePassword(password, user.password);
    if (!comparePassword) {
      throw HttpError(401, "Email or password is wrong");
    }

    const { _id: id, subscription } = user;
    const payload = {
      id,
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    await authService.updateUser({ _id: id }, { token });

    const responseData = {
      token,
      user: {
        email,
        subscription
      }
    };

    res.json(responseData)
  }
  catch(error) {
    next(error)
  }
}

export const getCurrent = async (req, res) => {
  try {
    
  const { email, subscription } = req.user;
  const user = await authService.findUser({ email });

  if (!user) {
      throw HttpError(401, "Not authorized");
    }

    res.json({
      email,
      subscription,
    })
  }
  catch(error) {
    next(error)
  }
}

export const signout = async (req, res, next) => {
  try {
    const { _id } = req.user;   
    await authService.updateUser({ _id }, { token: "" });
    if (!_id) {
      throw HttpError(401, "Not authorized");
    }
    res.json({
      message: "Signout success"
    });
  }
  catch(error) {
    next(error);
  }  
}