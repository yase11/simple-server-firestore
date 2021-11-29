// eslint-disable-next-line import/no-unresolved
const { authentication } = require('../../config/firebase');
const { createMessage, handleFirebaseError, logging } = require("../utils");

/**
 * 
 * @param {String} token Token ID for authentication purposes
 * @param {Response} res Response Entity
 */
const getToken = async (token, res) => {
    try {
        const { uid  } = await authentication
        .verifyIdToken(token, true);
        res.locals.uid = uid;
    } catch (error) {
        logging('getoken middleware', JSON.stringify(error));
        handleFirebaseError(error.errorInfo.code, res);
    }
}

/**
 * 
 * @param {Request} req HTTP Request Entity 
 * @param {Response} res HTTP Reponse Entity 
 * @param {callback} next Callback function
 */
const auth = async (req, res, next) => {

    const { token } = req.body;

    switch (true) {
        case (!!token): {
            await getToken(token, res);
            next();
            break;
        }

        default:
            res.status(401).send(createMessage(true, 'Unauthorized'));
    }
}

module.exports = auth;
