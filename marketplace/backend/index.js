const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { error, log } = require("console");

app.use(express.json());
app.use(cors());

// Database connection to mongoDB

mongoose.connect("mongodb+srv://cj:christian31@altaira.k7jsumg.mongodb.net/e-commerce");
// API Creation

app.get("/",(req,res)=>{
    res.send("Express App is Running")
})

// Image Storage Engine

const storage = multer.diskStorage({
    destination: 'upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});


const upload = multer({storage:storage})

// Creating Upload Endpoint for images
app.use('/images', express.static('upload/images'));


app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

// Schema for Creating Products

const Product = mongoose.model("Product",{
    id:{
        type: Number,
        required:true,
    },
    name:{
        type: String,
        required:true,
    },
    image:{
        type: String,
        required:true,
    },
    category:{
        type: String,
        required:true,
    },
    new_price:{
        type: Number,
        required:true,
    },
    old_price:{
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        default: 0,
    },
    date:{
        type: Date,
        default:Date.now,
    },
    available:{
        type: Boolean,
        default:true,
    },   
})

app.post('/addproduct',async (req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0)
    {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else{
        id=1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
        quantity:req.body.quantity,
    });
    console.log(product);
    await product.save();
    console.log("The product has been added.");
    res.json({
        success:true,
        name:req.body.name,
    })
})

// Creating API For Deleting products

app.post('/deleteproduct',async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("The product has been deleted.");
    res.json({
        success:true,
        name:req.body.name,
    })
})

// Creating API For Updating products
app.post('/updateproduct', async (req, res) => {
    const productId = req.body.id;
    const newName = req.body.name;
    const newOld_price = req.body.old_price;
    const newNew_price = req.body.new_price;
    const newQuantity = req.body.quantity;

    try {
        console.log(`Updating product ${productId}`);

        const updatedProduct = await Product.findOneAndUpdate(
            { id: productId },
            {
                $set: {
                    name: newName,
                    old_price: newOld_price,
                    new_price: newNew_price,
                    quantity: newQuantity
                }
            },
            { new: true }
        );

        console.log('Update operation result:', updatedProduct);

        if (!updatedProduct) {
            console.log(`Product ${productId} not found`);
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        console.log(`Product ${productId} updated successfully. New Product Name: ${updatedProduct.name} New Product Old Price: ${updatedProduct.old_price} New Product New Price: ${updatedProduct.new_price} New quantity: ${updatedProduct.quantity}`);
        res.json({ success: true, product: updatedProduct });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Creating For Showing All Products
app.get('/allproducts', async (req,res)=>{
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})


// Schema for Creating Admin Users
const AdminUsers = mongoose.model('AdminUsers', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

// Creating Endpoint for Registering Admin User
app.post('/admin/signup', async (req, res) => {
    let check = await AdminUsers.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, errors: "Existing Admin User Found." });
    }

    const adminUser = new AdminUsers({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });

    await adminUser.save();

    const data = {
        user: {
            id: adminUser.id,
            isAdmin: true,
        },
    };

    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token });
});

// Creating Endpoint for Admin User Login
app.post('/admin/login', async (req, res) => {
    let adminUser = await AdminUsers.findOne({ email: req.body.email });
    if (adminUser) {
        const passCompare = req.body.password === adminUser.password;
        if (passCompare) {
            const data = {
                user: {
                    id: adminUser.id,
                    isAdmin: true,
                },
            };
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token });
        } else {
            res.json({ success: false, errors: "Password does not match." });
        }
    } else {
        res.json({ success: false, errors: "Email ID does not exist." });
    }
 });


// Schema for Creating Users
const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

// Creating Endpoint for Registering User
app.post('/signup', async(req,res)=>{

    let check = await Users.findOne({email:req.body.email});
    if (check){
        return res.status(400).json({success:false,errors:"Existing User Found."})
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i]=0;
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart
    })

    await user.save();

    const data = {
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token})
})

// Creating Endpoint for User Login
app.post('/login', async (req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if (user){
        const passCompare = req.body.password === user.password;
        if (passCompare){
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({success:true,token})
        }
        else{
            res.json({success:false,errors:"Password does not match."});
        }
    }
    else{
        res.json({success:false,errors:"Email ID does not exist."})
    }
})

// Creating Endpoint to Get All Users
app.get('/allusers', async (req, res) => {
        const users = await Users.find({}, { name: 1, email: 1, date: 1 }); // Fetch only necessary fields
        console.log("All Users Fetched");
        res.json(users);
})

// Creating Middleware to Fetch User
const fetchUser = async (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token) {
        res.status(401).send({errors:"Please authenticate using a valid token"})
    }
    else{
        try {
            const data = jwt.verify(token,'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({errors:"Please authenticate using a valid token"})
        }
    }
}

// Creating Endpoint for Popular and New
app.get('/popular', async (req,res)=>{
    let products = await Product.find({category:"guitar"});
    let popular_new = products.slice(0,6);
    console.log("Popular Fetched");
    res.send(popular_new);
})

app.get('/relatedproducts', async (req,res)=>{
        const categories = ["guitar", "accessories", "amplifier", "effects"];
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];

        const products = await Product.aggregate([
            { $match: { category: randomCategory } },
            { $sample: { size: 6 } }
        ]);
        console.log("Related Products Fetched");
        res.send(products);
})

// Creating Endpoint for Adding Products in CartData
app.post('/addtocart',fetchUser,async (req,res)=>{
    console.log("Added",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added")
})

// Creating Endpoint to Removing Product from CartData
app.post('/removefromcart', fetchUser, async (req,res)=>{
    console.log("Removed",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed")
})

// Creating Endpoint to Get CartData
app.post('/getcart',fetchUser,async (req,res)=>{
    console.log("GetCart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

app.listen(port,(error)=>{
    if(!error){
        console.log("Server Running on Port " +port)
    }
    else{
        console.log("Error :" +error)
    }
})