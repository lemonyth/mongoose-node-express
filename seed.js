const mongoose = require('mongoose');
const Product = require('./models/product');


mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true})
    .then(()=>{
        console.log("MONGO CONNECTIPN OPEN")
    })
    .catch(err =>{
        console.log("something went wrong.")
    })

    // insertmany

    //seed data array
    const seedProducts = [
        {
            name: 'tomatos',
            price: 12.0,
            category: 'vegetable'
        },
        {
            name: 'onions',
            price: 4.50,
            category: 'vegetable'
        },
        {
            name: 'irish potatos',
            price: 40.0,
            category: 'vegetable'
        },
        {
            name: 'bananas',
            price: 9.99,
            category: 'fruit'
        }
    ]

    Product.insertMany(seedProducts)
        .then(res => {
            console.log(res)
        })
        .catch(err =>{
            console.log(err)
        })