import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Computer Says No Engine API' });
});

export { app };