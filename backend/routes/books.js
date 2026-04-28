import { Router } from 'express';
import pool from '../db.js';
import { authMiddleware } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT b.*, u.name as seller_name FROM books b JOIN users u ON b.user_id = u.id ORDER BY b.created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT b.*, u.name as seller_name FROM books b JOIN users u ON b.user_id = u.id WHERE b.id = ?',
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Book not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { title, author, price, selling_price, condition, description } = req.body;
    if (!title || !author || !price || !selling_price) {
      return res.status(400).json({ error: 'Title, author, price, and selling price are required' });
    }
    const image = req.file ? req.file.filename : null;
    const [result] = await pool.execute(
      'INSERT INTO books (title, author, price, selling_price, image, condition_type, description, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, author, price, selling_price, image, condition || 'Good', description || '', req.user.id]
    );
    res.status(201).json({ id: result.insertId, message: 'Book added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM books WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Book not found' });
    await pool.execute('DELETE FROM books WHERE id = ?', [req.params.id]);
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
