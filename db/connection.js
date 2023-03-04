const mongoose = require('mongoose');
const db_url_product=process.env.DB_URL_PRODUCT;
// console.log(db_url);
mongoose.connect(db_url_product,{})
.then(()=>{
    console.log("connection successful")
})
.catch((error)=>{
    console.log(error);
})