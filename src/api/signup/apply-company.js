const express = require('express');
const { auth } = require('../../middlewares');
const { applyCompanyClaims } = require('../../services/signup');

const router = express.Router();


router.post('', auth, async (req, res) => {
    try {
        const oldToken = req.body.token;

        if (oldToken) {
            const token = await applyCompanyClaims(oldToken);

            if (token) { 
                return res.json({ success: true, message: 'The user has completed applying company', token}); 
            }
            return res.json(
                { success: false, message: 'Failed to complete application on company, contact admin support'}
            );
        } 
        
        return res.status(401).json({ error: true, message: 'Invalid credentials'});
    } catch (error) {
        return res.status(500).json({ error: true, message: 'Something went wrong!'});
    }
});

module.exports = router;