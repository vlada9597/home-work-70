Home-Work-70 — Express + Mongoose + MongoDB + Docker

📌 Опис проекту

Цей проект демонструє роботу REST API, створеного на Express.js, з підключенням до MongoDB через Mongoose ORM, розгорнутий у середовищі Docker Compose.

Реалізовано CRUD-операції над колекцією Products, включно з:

створенням продукту

отриманням списку продуктів

оновленням продукту

видаленням продукту

Проект повністю контейнеризований та готовий до розгортання.

--------------

📁 Структура проекту
home-work-70/
│
├─ app.js
├─ Dockerfile
├─ docker-compose.yml
├─ package.json
├─ package-lock.json
├─ models/
│   └─ Product.js
└─ README.md

---------------------------------

🛠 Встановлення та запуск (Docker)
1. Клонувати або скопіювати проект
cd C:\Users\admin\Desktop\Fullstack JS\JS\

2. Запустити Docker-контейнери
docker compose up --build


Docker автоматично:

підніме MongoDB

збілдить Express-додаток

підключить Express → MongoDB через Mongoose

🌐 Перевірка роботи сервера
В браузері:
http://localhost:3000


Або PowerShell:

curl http://localhost:3000


Відповідь:

Вітаю! Express з Docker та MongoDB працює!

🧩 API Маршрути
📘 1. Отримати всі продукти

GET /products

curl http://localhost:3000/products

📙 2. Створити новий продукт

POST /products

Invoke-WebRequest -Uri "http://localhost:3000/products" `
  -Method POST `
  -Headers @{ "Content-Type"="application/json" } `
  -Body '{ "title":"Test", "description":"Desc", "price":123 }'


Приклад відповіді:

{
  "title": "Test",
  "description": "Desc",
  "price": 123,
  "_id": "xxx",
  "createdAt": "...",
  "updatedAt": "...",
  "__v": 0
}

📕 3. Оновити продукт

PUT /products/:id

Invoke-WebRequest -Uri "http://localhost:3000/products/ID_HERE" `
  -Method PUT `
  -Headers @{ "Content-Type"="application/json" } `
  -Body '{ "title":"Updated", "description":"Updated Desc", "price":999 }'

📗 4. Видалити продукт

DELETE /products/:id

Invoke-WebRequest -Uri "http://localhost:3000/products/ID_HERE" -Method DELETE

📦 Mongoose модель Product

Файл models/Product.js:

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  image: { type: String }
}, {
  timestamps: true
});

export default mongoose.model('Product', productSchema);

🐳 Docker інструкції
Запустити проект
docker compose up --build

Зупинити проект
docker compose down

Переглянути логи
docker logs express-app
docker logs mongo

🧪 Тестування MongoDB всередині контейнера
docker exec -it mongo bash
mongosh
show dbs

📤 GitHub Deployment
git init
git add .
git commit -m "Home-work-70 complete"
git branch -M main
git remote add origin <your_repo_url>
git push -u origin main
