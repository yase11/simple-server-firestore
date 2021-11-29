const express = require('express');
const { auth } = require('../../middlewares');
const { completedUserClaims } = require('../../services/signup');

const router = express.Router();


router.post('', auth, async (req, res) => {
    try {
        const { uid } = res.locals;
        const oldToken = req.body.token;
        if (oldToken && uid) {
            const token = await completedUserClaims(oldToken);

            if (token) { 
                return res.status(200).json({ success: true, message: 'The user completed setup profile', token}); 
            }
            return res.status(500).json(
                { success: false, message: 'You are not eligible to access'}
            );
        }
        if (!uid || !oldToken){
            return res.status(401).json({ success: false, message: 'Invalid credentials'}); 
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Something went wrong'}); 
    }
    return null;
});

module.exports = router;