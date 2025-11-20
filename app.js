import express from 'express';
import mongoose from 'mongoose';
import Product from './models/Product.js';

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/testdb';

app.use(express.json());

// Підключення до MongoDB через Mongoose
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB підключено'))
.catch(err => console.error('Помилка підключення до MongoDB:', err));

// Головний маршрут
app.get('/', (req, res) => {
  res.send('Вітаю! Express з Docker та MongoDB працює!');
});

// Отримати всі продукти (limit 10)
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find().limit(10);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Додати новий продукт
app.post('/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Оновити продукт по id
app.put('/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) return res.status(404).json({ error: 'Продукт не знайдено' });
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Видалити продукт по id
app.delete('/products/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ error: 'Продукт не знайдено' });
    res.json({ message: 'Продукт видалено', product: deletedProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущено на порті ${PORT}`);
});
