require('dotenv').config();
const { MongoClient } = require("mongodb");
const express = require("express");
const app = express();

const db = {};

const connectToDb = () => {
  return new Promise((resolve, reject) => {
    const client = new MongoClient("mongodb://127.0.0.1:27017");
    client.connect((error) => {
      if (error) {
        reject(error);
      } else {
        const database = client.db("your_db_name");
        db.inventories = database.collection("inventories");
        db.orders = database.collection("orders");
        db.users = database.collection("users");
        resolve();
      }
    });
  });
};

const orderData = [
  { "_id" : 1, "item" : "almonds", "price" : 12, "quantity" : 2 },
  { "_id" : 2, "item" : "pecans", "price" : 20, "quantity" : 1 },
  { "_id" : 3, "item" : "pecans", "price" : 20, "quantity" : 3 },
];

const inventoryData = [
  { "_id" : 1, "sku" : "almonds", "description": "product 1", "instock" : 120 },
  { "_id" : 2, "sku" : "bread", "description": "product 2", "instock" : 80 },
  { "_id" : 3, "sku" : "cashews", "description": "product 3", "instock" : 60 },
  { "_id" : 4, "sku" : "pecans", "description": "product 4", "instock" : 70 },
];

const userData = [
  {"username": "admin", password: "MindX@2022"},
  {"username": "alice", password: "MindX@2022"}
];

const insertData = async () => {
  await db.orders.insertMany(orderData);
  await db.inventories.insertMany(inventoryData);
  await db.users.insertMany(userData);
};

connectToDb()
  .then(() => {
    insertData();
  })
  .catch((error) => {
    console.log(error);
  });

  app.get("/api/inventory/low-quantity", async (req, res) => {
    try {
      const query = { quantity: { $lt: 100 } };
      const products = await db.inventories.find(query).toArray();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi lấy dữ liệu từ kho" });
    }
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});

module.exports = { connectToDb, db };

// http://localhost:3000/api/inventory/low-quantity

