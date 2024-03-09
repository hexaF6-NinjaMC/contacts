const mongodb = require('../db/connect.js');
const createObjectId = require('mongodb').ObjectId.createFromHexString;

const getContact = async (req, res) => {
    // #swagger.tags = ['Contacts']
    // #swagger.description='Get contact by ID on server root'
    // #swagger.parameters['id'] = {description: 'HexString of 24 characters', type: 'string'}
    const userId = createObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').find({ _id: userId });
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

const getAllContacts = async (req, res) => {
    // #swagger.tags = ['Contacts']
    // #swagger.description='Get all contacts on server root'
    const result = await mongodb.getDb().db().collection('contacts').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const createContact = async (req, res) => {
    // #swagger.tags = ['Contacts']
    // #swagger.description='Create contact on server root'
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

const updateContact = async (req, res) => {
    // #swagger.tags = ['Contacts']
    // #swagger.description = 'Update contact by ID on server root'
    // #swagger.parameters['id'] = {description: 'HexString of 24 characters', type: 'string'}
    const userId = createObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDb().db().collection('contacts').replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
};

const deleteContact = async (req, res) => {
    // #swagger.tags = ['Contacts']
    // #swagger.description='Delete contact by ID on server root'
    // #swagger.parameters['id'] = {description: 'HexString of 24 characters', type: 'string'}
    const userId = createObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: userId }, true);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the user.');
    }
};

const deleteAll = async (req, res) => {
    // #swagger.tags = ['Contacts']
    // #swagger.description='Delete all contacts on server root.'
    const response = await mongodb.getDb().db().collection('contacts').deleteMany({});
    if (response.deletedCount > 0) {
        res.status(204).send({
            "message": `Deleted ${response.deletedCount} contacts successfully.`
        });
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting all contacts.');
    }
};

module.exports = {
    getContact,
    getAllContacts,
    createContact,
    updateContact,
    deleteContact,
    deleteAll
};