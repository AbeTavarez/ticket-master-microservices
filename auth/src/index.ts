import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/api/users/currentuser', async (req, res) => {
    res.send('Hello');
});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
    
});