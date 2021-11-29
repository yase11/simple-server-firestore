/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
const { FieldValue } = require('firebase-admin/firestore');
const express = require('express');

const router = express.Router();

const { throwError, logging, createMessage } = require('../../utils');
const { getCorporation, addCorporation } = require('../../services/corporation');
/**
 * Router GET method
 */
router.get('/all', async (req, res) => {
    try {
        const corporations = await getCorporation();
        switch (true) {
            case (!!corporations):
                res.status(200).json({ success: true, results: corporations});
                break;
        
            default:
                throwError('Failed to retrieve corporations by default', 500);
        }

    } catch (error) {
        logging('corporation get', error);
        if (error.status) res.status(error.status).json(
            createMessage(true, error)
        );
        else res.status(500).json(
            createMessage(true, 'Cannot retrieve corporations')
        );
    }

});


/**
 * Router POST method
 */
// eslint-disable-next-line consistent-return
router.post('/', async (req, res) => {
    try {
        const { corporationName,
                legalName,
                street,
                city,
                state,
                zipCode,
                telephone,
                email
              } = req.body;

        if (!corporationName || !legalName || !street || !city || 
            !state || !zipCode || !telephone || !email) {
            throwError('Incomplete information provided [Corporation]', 400);
        }

        const corporationObj = {
            corporationName,
            legalName,
            street,
            city,
            state,
            zipCode,
            telephone,
            email,
            subscriptionId: '',
            taxId: '',
            adminName: '',
            isActive: true,
            s: [],
            users:[],
            n: '',
            lastUpdated: FieldValue.serverTimestamp(),
        };

        const corporationRef = await addCorporation(corporationObj);

        if (corporationRef) {
            return res.status(201).json({ success: true, results: [corporationRef]});
        }
    } catch (error) {
        logging('corporation post', error);
        if (error.status) res.status(error.status).json(
            error
        );

        else res.status(500).json(
            createMessage(true, 'Failed to create corporation')
        );
    }

});

module.exports = router;