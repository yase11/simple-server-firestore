const express = require('express');
const { auth } = require('../../middlewares');
const { completedCompanyClaims } = require('../../services/signup');

const router = express.Router();


router.post('', auth, async (req, res) => {
    try {
        const oldToken = req.body.token;

        if (oldToken) {
            const token = await completedCompanyClaims(oldToken);

            if (token) { 
                return res.json({ success: true, message: 'The user has completed profile', token}); 
            }
            return res.json(
                { success: false, message: 'Failed to complete company profile, contact admin support'}
            );
        } 
        
        return null;
    } catch (error) {
        return console.error(error);
    }
});

module.exports = router;