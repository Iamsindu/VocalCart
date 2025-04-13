const express = require('express');
const multer = require('multer');
const Product = require('../models/Product');
const path = require('path');
const fs = require('fs');

const productRoutes = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = './uploads/';
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = `${file.fieldname}-${Date.now()}${ext}`;
        cb(null, name);
    },
});
const upload = multer({ storage });

productRoutes.post('/', upload.single('image'), async (req, res) => {
    try {
        const {
            productName,
            category,
            subCategory,
            description,
            stockStatus,
            discount,
            offerPrice,
        } = req.body;

        const newProduct = new Product({
            productName,
            category,
            subCategory,
            description,
            stockStatus,
            discount,
            offerPrice,
            imageUrl: req.file ? `/uploads/${req.file.filename}` : '',
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Server error while creating product.' });
    }
});

productRoutes.get('/', async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error while fetching products.' });
    }
});

module.exports = productRoutes;
