import { Request, Response, NextFunction } from 'express';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import cors from 'cors';
import candidateRouter from './routes/candidates';
import documentRouter from './routes/documents';

dotenv.config();
const prisma = new PrismaClient();

export const app = express();
export default prisma;

const port = 3010;

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hola LTI!');
});

app.use('/api/candidates', candidateRouter);
app.use('/api/documents', documentRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  
  if (err.name === 'PrismaClientKnownRequestError') {
    return res.status(400).json({ error: 'Database error', message: err.message });
  }
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: 'Validation error', message: err.message });
  }
  
  res.status(500).json({ error: 'Internal server error', message: 'Something went wrong' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
