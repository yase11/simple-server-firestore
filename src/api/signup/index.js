
const express = require('express');

const router = express.Router();

const { authentication } = require('../../../config/firebase');
const { createMessage, logging, handleFirebaseError } = require('../../utils');
const { addUser } = require('../../services/user');

/**
 * Router POST method
 * 
 * Create an account on firebase 
 */
router.post('', async (req, res) => {
    try {
        const { email, password, corporation, company } = req.body;

        console.log(req.body);

        if (!email || !password) {
            return res.status(400).json(
                createMessage(true, 'Invalid email and password supplied')
            );
        }

        if (!corporation || !company) {
            return res.status(400).json(
                createMessage(true, 'Invalid corporation and company supplied')
            );
        }

        const userRef = await authentication.createUser({ email, password});

        logging('signup post', userRef, false);

        const user = {
            refuserId: userRef.uid,
            userId: '',
            companyId: '',
            userName: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            role: ['user'],
            isActive: false,
            createdOn: '',
            lastUpdated: ''
        }

        const userData = { corporation, company, user};

        const newUser = await addUser(userData);
        
        return res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        const firebase = await handleFirebaseError(error.code, res);

        if (!firebase) return res.status(500).send(
            createMessage(true, 'Unable to create user account')
        );
        return null;
    }

});

router.use('/account', require('./account'));
router.use('/corporation', require('./corporation'));
router.use('/apply-company', require('./apply-company'));
router.use('/company', require('./company'));
router.use('/user', require('./user'));

module.exports = router;