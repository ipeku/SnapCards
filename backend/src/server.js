import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes.js';

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api', routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
