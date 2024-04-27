const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET_KEY;

async function withAuth(req, res, next) {
    const token = req.headers["authorization"].split(" ")[1];
    try {
        const {payload} = jwt.verify(token, SECRET, {complete: true});
        console.log(payload.email);
        res.locals.email = payload.sub;
        res.locals.userId = payload.userId;
        console.log('Login with success');
        next();
    } catch (error) {
        res.status(401).json({error: 'Unauthorized'});
    }
}

module.exports = withAuth;