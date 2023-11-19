import express from 'express';

const router = express.Router();

router.post('/api/users/signin', async (req, res) => {
    res.send('ok');
});

export {router as signinRouter};