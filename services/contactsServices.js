import Contact from '../models/Contact.js';

export const listContacts = (filter = {}, query = {}) => Contact.find(filter, "-createdAt -updatedAt", query);

export const addContact = (data) => Contact.create(data);

export const getContactById = id => Contact.findById(id)

export const updateContact = (id, data) => Contact.findByIdAndUpdate(id, data);

export const removeContact = id => Contact.findByIdAndDelete(id);

export const updateStatusContact = (id, data) => Contact.findByIdAndUpdate(id, data);

export const getOneContact = filter => Contact.findOne(filter);

export const updateOneContact = (filter, data) => Contact.findOneAndUpdate(filter, data);

export const deleteOneContact = filter => Contact.findOneAndDelete(filter);

export const updateOneStatusContact = (filter, data) => Contact.findOneAndUpdate(filter, data);