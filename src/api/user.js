const router = require('express').Router();
const { auth } = require('../middlewares');
const { throwError, logging } = require('../utils');
const { getUserCollection, getUser } = require('../services/user');

router.post('/', auth, async (req, res) => {
    try {
        if (!res.locals.uid){
            throwError();
        }
    } catch (error) {
        logging('post user', error);
    }
});

router.get('/', async (req, res) => {
    try {
        const collections = await getUserCollection();
        return res.status(200).json(collections);
    } catch (error) {
        logging('user get', error);
        return res.json(error);
    }
});

router.get('/all', async (req, res) => {
    try {
        const { company, corporation } = req.body;
        const user = { company, corporation };
        const collections = await getUser(user);
        return res.status(200).json(collections);
    } catch (error) {
        logging('user/all get', error);
        return res.json(error);
    }
});



module.exports = router;