const express = require('express');
const { auth } = require('../../middlewares');
const { completedCorporationClaims } = require('../../services/signup');

const router = express.Router();


router.post('', auth, async (req, res) => {
    try {
        const oldToken = req.body.token;

        if (oldToken) {
            const token = await completedCorporationClaims(oldToken);

            if (token) { 
                return res.status(200).json({ success: true, message: 'The user granted to proceed last step', token}); 
            }
            return res.status(500).json(
                { success: false, message: 'Failed to proceed last step, contact admin support'}
            );
        } 
        return res.status(400).json(
            { success: false, message: 'Invalid credentials'}
        );
    } catch (error) {
        return res.status(500).json(
            { success: false, message: 'Something went wrong'}
        );
    }
});

module.exports = router;