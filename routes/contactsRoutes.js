const router = require('express').Router();

const contactsController = require('../controllers/contactsController');

// localhost:8080/ - API endpoint gets all contacts on server root
router.get('/', contactsController.getAllContacts);

// localhost:8080/:id - gets contact by ID on server root
router.get('/:id', contactsController.getContact);

// localhost:8080/ - create contact on server root (POST)
router.post('/', contactsController.createContact);

// localhost:8080/:id - update contact by ID on server root
router.put('/:id', contactsController.updateContact);

// localhost:8080/:id - delete contact by ID on server root
router.delete('/:id', contactsController.deleteContact);

module.exports = router;