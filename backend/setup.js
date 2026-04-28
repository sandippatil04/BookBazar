import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

async function setup() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
  });

  try {
    await connection.execute('CREATE DATABASE IF NOT EXISTS bookbazar');
    console.log('Database "bookbazar" created');

    await connection.changeUser({ database: 'bookbazar' });

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Table "users" created');

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS books (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        selling_price DECIMAL(10,2) NOT NULL,
        image VARCHAR(255) DEFAULT NULL,
        condition_type VARCHAR(50) DEFAULT 'Good',
        description TEXT,
        user_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log('Table "books" created');

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS cart (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        book_id INT NOT NULL,
        quantity INT DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
        UNIQUE KEY unique_cart (user_id, book_id)
      )
    `);
    console.log('Table "cart" created');

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        total DECIMAL(10,2) NOT NULL,
        payment_method VARCHAR(50) DEFAULT 'COD',
        status VARCHAR(50) DEFAULT 'confirmed',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log('Table "orders" created');

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        book_id INT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
      )
    `);
    console.log('Table "order_items" created');

    console.log('\nSetup complete! All tables created successfully.');
  } catch (err) {
    console.error('Setup failed:', err.message);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

setup();
