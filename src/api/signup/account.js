const express = require('express');
const { auth } = require('../../middlewares');
const { selectAccountCustomClaims } = require('../../services/signup');

const router = express.Router();


router.post('', auth, async (req, res) => {
    try {
        const { uid } = res.locals;
        console.log(uid);

        if (uid) {
            const token = await selectAccountCustomClaims(uid);

            if (token) { 
                return res.status(200).json({ success: true, message: 'The user granted to proceed next step selecting account', token}); 
            }
            return res.status(500).json(
                { success: false, message: 'Failed to proceed selecting account, contact admin support'}
            );
        } 
        
        return null;
    } catch (error) {
        return console.error(error);
    }
});

module.exports = router;