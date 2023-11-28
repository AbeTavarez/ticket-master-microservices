import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/api/users/current-user', async(req, res) => {

    // checks if request session does't includes a jwt token
    if (!req.session?.jwt) {
        return res.send({currentUser: null});
    }

    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
        res.send({currentUser: payload});
    } catch (err) {
        res.send({currentUser: null});
    }
});

export {router as currentUserRouter};