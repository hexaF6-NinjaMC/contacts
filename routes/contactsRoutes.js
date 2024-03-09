const router = require('express').Router();

const contactsController = require('../controllers/contactsController');

router.get('/contacts', contactsController.getAllContacts);

router.get('/contacts/:id', contactsController.getContact);

router.post('/contacts', contactsController.createContact);

router.put('/contacts/:id', contactsController.updateContact);

router.delete('/contacts/:id', contactsController.deleteContact);

router.delete('/contacts', contactsController.deleteAll)

module.exports = router;