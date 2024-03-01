const mongodb = require('../db/connect.js');
const objectId = require('mongodb').ObjectId;

const getContact = async (req, res, next) => {
    const userId = objectId.createFromTime(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').find({ _id:  userId });
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

const getAllContacts = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('contacts').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const createContact = async (req, res, next) => {
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const response = await mongodb.getDb().db().collection('contacts').insertOne(contact);
    if (response.acknowledged) {
        res.status(200).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occured while creating the contact.');
    }
};

const updateContact = async (req, res, next) => {
    const userId = objectId.createFromTime(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDb().db().collection('contacts').replaceOne({ _id: userId }, user);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
};

const deleteContact = async (req, res, next) => {
    const userId = objectId.createFromTime(req.params.id);
    const response = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the user.');
    }
};

module.exports = {
    getContact,
    getAllContacts,
    createContact,
    updateContact,
    deleteContact
};