import { Router } from 'express';
import pool from '../db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT c.id as cart_id, c.quantity, b.* FROM cart c JOIN books b ON c.book_id = b.id WHERE c.user_id = ?`,
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { book_id } = req.body;
    if (!book_id) return res.status(400).json({ error: 'Book ID is required' });
    const [existing] = await pool.execute(
      'SELECT * FROM cart WHERE user_id = ? AND book_id = ?',
      [req.user.id, book_id]
    );
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Book already in cart' });
    }
    await pool.execute('INSERT INTO cart (user_id, book_id) VALUES (?, ?)', [req.user.id, book_id]);
    res.status(201).json({ message: 'Added to cart' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await pool.execute('DELETE FROM cart WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    res.json({ message: 'Removed from cart' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
