import bcrypt from "bcrypt";
import User from '../models/User.js';

export const findUser = filter => User.findOne(filter);

export const signup = async (data) => {
  const hasPassword = await bcrypt.hash(data.password, 10);  
  return User.create({ ...data, password: hasPassword })
};
 
export const validatePassword = async (password, hashPassword) => bcrypt.compare(password, hashPassword);