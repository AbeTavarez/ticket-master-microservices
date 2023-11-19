import express from 'express';

const router = express.Router();

router.post('/api/users/signout', async (req, res) => {
    res.send('ok');
});

export {router as signoutRouter};