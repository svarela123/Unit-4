require('dotenv').config()
const jwt = require('jsonwebtoken')
const {SECRET} = process.env
// The secret used to verify the token is taken from the SECRET variable in the .env file.

module.exports = {
    isAuthenticated: (req, res, next) => {
        const headerToken = req.get('Authorization')
        // extracting the value of the 'Authorization' header from the incoming request object req.

        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }
        // if falsy, it logs an error message in the console and sends a 401 status code to the client

        let token

        try {
            token = jwt.verify(headerToken, SECRET)
        } catch (err) {
            err.statusCode = 500
            throw err
        }
        // This will verify the token passed through authorization.

        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }

        next()
        // This function will tell the middleware system to move on to the next piece of middleware in the chain or to the next function that is handling the request
    }
}