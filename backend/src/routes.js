import { Router } from 'express';
import db from './db.js';

const router = Router();


router.get('/cards', (req, res) => {
  const rows = db.prepare('SELECT id, term, definition, created_at FROM cards ORDER BY id DESC').all();
  res.json(rows);
});

router.get('/cards/search', (req, res) => {
  const q = (req.query.q || '').trim();
  if (!q) return res.json([]);
  const like = `%${q}%`;
  const rows = db.prepare(`
    SELECT id, term, definition, created_at
    FROM cards WHERE term LIKE ? OR definition LIKE ?
    ORDER BY id DESC
  `).all(like, like);
  res.json(rows);
});


router.post('/cards', (req, res) => {
  const { term, definition } = req.body || {};
  if (!term?.trim() || !definition?.trim()) {
    return res.status(400).json({ error: 'term ve definition gereklidir' });
  }
  const info = db.prepare('INSERT INTO cards (term, definition) VALUES (?, ?)').run(term.trim(), definition.trim());
  const item = db.prepare('SELECT id, term, definition, created_at FROM cards WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json(item);
});

router.put('/cards/:id', (req, res) => {
  const id = Number(req.params.id);
  const { term, definition } = req.body || {};
  const row = db.prepare('SELECT id FROM cards WHERE id = ?').get(id);
  if (!row) return res.status(404).json({ error: 'bulunamadı' });
  if (!term?.trim() || !definition?.trim()) {
    return res.status(400).json({ error: 'term ve definition gereklidir' });
  }
  db.prepare('UPDATE cards SET term = ?, definition = ? WHERE id = ?').run(term.trim(), definition.trim(), id);
  const updated = db.prepare('SELECT id, term, definition, created_at FROM cards WHERE id = ?').get(id);
  res.json(updated);
});


router.delete('/cards/:id', (req, res) => {
  const id = Number(req.params.id);
  const info = db.prepare('DELETE FROM cards WHERE id = ?').run(id);
  if (info.changes === 0) return res.status(404).json({ error: 'bulunamadı' });
  res.status(204).end();
});

export default router;
