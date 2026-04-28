import { Router } from 'express';
import pool from '../db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { items, payment_method, total } = req.body;
    if (!items || items.length === 0) return res.status(400).json({ error: 'No items to order' });

    const [result] = await pool.execute(
      'INSERT INTO orders (user_id, total, payment_method, status) VALUES (?, ?, ?, ?)',
      [req.user.id, total, payment_method || 'COD', 'confirmed']
    );

    const orderId = result.insertId;
    for (const item of items) {
      await pool.execute(
        'INSERT INTO order_items (order_id, book_id, price) VALUES (?, ?, ?)',
        [orderId, item.id, item.selling_price]
      );
    }

    await pool.execute('DELETE FROM cart WHERE user_id = ?', [req.user.id]);

    res.status(201).json({ orderId, message: 'Order placed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const [orders] = await pool.execute(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    for (const order of orders) {
      const [items] = await pool.execute(
        `SELECT oi.*, b.title, b.author, b.image, b.price as original_price FROM order_items oi JOIN books b ON oi.book_id = b.id WHERE oi.order_id = ?`,
        [order.id]
      );
      order.items = items;
    }
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
