const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');

/**
 * 
 * @param {Request} req The request receive in the server request
 * @param {Response} res The feedback on request made whether a valid or not request
 */
 const getCheckApi = async (req, res) => {
    try {
        // eslint-disable-next-line no-throw-literal
        if (!res.locals.uid) throw {errors: 
            {status: 401, message: 'Unauthorized access'}
        }

        res.status(200).json(
            res.locals.uid
        );

    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
}



router.get('/', auth,  getCheckApi);

module.exports = router;