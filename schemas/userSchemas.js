import Joi from "joi";

export const userSignupSchema = Joi.object({  
  email: Joi.string().required(),
  password: Joi.string().min(5).required(),
  subscription: Joi.string(),
})

export const userSigninSchema = Joi.object({ 
  email: Joi.string().required(),
  password: Joi.string().min(5).required(),
  subscription: Joi.string(),
  token: Joi.string(),
})