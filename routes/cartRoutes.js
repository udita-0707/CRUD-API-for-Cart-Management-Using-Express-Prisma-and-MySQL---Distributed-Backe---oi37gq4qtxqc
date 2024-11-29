const express = require('express');
const router = express.Router();
const { prisma } = require('../db/config');
const authMiddleware = require('../authMiddleware');

// Apply authentication middleware to all routes
router.use(authMiddleware);

// 1. Create a New Cart Entry
router.post('/addProduct', async (req, res) => {
  const { userId, productId, count } = req.body;

  if (!userId || !productId || !count) {
    return res.status(404).json({ error: 'All fields required' });
  }

  try {
    const cart = await prisma.cart.create({
      data: { userId, productId, count },
    });

    return res.status(201).json(cart);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create cart entry' });
  }
});

// 2. Retrieve Cart Entry by ID
router.get('/getById/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const cart = await prisma.cart.findUnique({
      where: { cartId: parseInt(id, 10) },
    });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve cart entry' });
  }
});

// 3. Partially Update a Cart Entry
router.patch('/patch/:id', async (req, res) => {
  const { id } = req.params;
  const { count } = req.body;

  if (!count) {
    return res.status(404).json({ error: 'Count field is required for update' });
  }

  try {
    const updatedCart = await prisma.cart.update({
      where: { cartId: parseInt(id, 10) },
      data: { count },
    });

    return res.status(200).json(updatedCart);
  } catch (error) {
    return res.status(404).json({ error: 'Cart not found' });
  }
});

// 4. Delete a Cart Entry
router.delete('/removeProduct/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.cart.delete({
      where: { cartId: parseInt(id, 10) },
    });

    return res.status(200).json({ message: 'Cart deleted successfully' });
  } catch (error) {
    return res.status(404).json({ error: 'Cart not found' });
  }
});

module.exports = router;
