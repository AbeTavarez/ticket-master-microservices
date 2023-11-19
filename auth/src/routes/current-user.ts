import express from 'express';

const router = express.Router();

router.get('/api/users/current-user', async(req, res) => {
    res.send('ok');
});

export {router as currentUserRouter};