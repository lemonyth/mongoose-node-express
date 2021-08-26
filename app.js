const express =  require('express')
const app = express();

const path = require('path');
const mongoose = require('mongoose');

const methodOverride = require('method-override')

const Product = require('./models/product');
const { urlencoded } = require('express');

//connect to mongo with mongoose
mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true})
    .then(()=>{
        console.log("MONGO CONNECTION OPEN")
    })
    .catch(err =>{
        console.log("something went wrong.")
    })

    //middleware
    app.use(express.urlencoded({extended: true}));
    app.use(methodOverride('_method'));

    //configuring ejs and views directory
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    

    // RESTful Routing..

    // index page
    app.get('/products', async (req, res)=>{

        const products = await Product.find({})
        res.render('products/index.ejs', {products})
    })

    //serve form to add a new product
    app.get('/products/new', (req, res)=>{
        res.render('products/new.ejs')
    })

    //posting form data
    app.post('/products', async (req, res) =>{
        console.log(req.body)
         const newProduct = new Product(req.body);
         await newProduct.save()
         res.redirect('/products')
   
        
    })

    //details page
    app.get('/products/:id', async (req, res)=>{
        const { id } = req.params;
        const product  = await Product.findById(id);
        res.render('products/details.ejs', {product});
    })

    //server form to edit product
    app.get('/products/:id/edit', async (req, res) =>{
        const { id } = req.params;
        const product = await Product.findById(id)
        res.render('products/edit.ejs', {product});
    })

    //posting (putting) data from the edit form
    app.put('/products/:id', async(req, res)=>{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
        res.redirect(`/products/${product._id}`)
    })

    

    

    // port
    app.listen(3000,()=>{
        console.log("listening on port 3000")
    })