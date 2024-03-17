import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js"
import {createContactSchema, updateContactSchema, updateFavoriteStatusSchema } from "../schemas/contactsSchemas.js"

export const getAllContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const result = await contactsService.listContacts({owner}, {skip, limit});

    res.json(result);
  }
  catch(error) {
    next(error)
  }  
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;
   
    const result = await contactsService.getOneContact({ _id: id, owner });

    if (!result) {
      throw HttpError(404)
    }
    res.json(result);
  }
  catch (error) {
    next(error)
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;
    
    const result = await contactsService.deleteOneContact({ _id: id, owner });

     if (!result) {
      throw HttpError(404)
    }

    res.json(result)

  }
  catch (error) {
    next(error)
  }
};

export const createContact = async (req, res) => {
  
  try {
    const { _id: owner } = req.user;
    const { error } = createContactSchema.validate(req.body);
    
    if (error) {
      throw HttpError(400, error.message)
    }
    
    const result = await contactsService.addContact({ ...req.body, owner });
   
     res.status(201).json(result);
  }

  catch (error) {
    next(error)
  }
};

export const updateContact = async (req, res) => {
  try {
    const { error } = updateContactSchema.validate(req.body);    
    const { id } = req.params;
    const { _id: owner } = req.user;
    
    const result = await contactsService.updateOneContact({ _id: id, owner })

    if (error) {
      throw HttpError(400, error.message)
    }

    if (!result) {
      throw HttpError(404)
    }

    res.json(result);
  }

  catch (error) {
    next(error)
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = updateFavoriteStatusSchema.validate(req.body);
    const { _id: owner } = req.user;
    const { id } = req.params;
   
    const result = await contactsService.updateOneStatusContact({ _id: id, owner }, {new: true })

    if (error) {
      throw HttpError(400, error.message)
    }       

    if (!result) {
      throw HttpError(404)
    }
    res.json(result);
  }
  catch (error) {
    next(error)
  }
};
