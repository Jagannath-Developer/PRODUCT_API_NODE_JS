const mongoose = require('mongoose');
const  productSchema=new mongoose.Schema({
    product_id:{
        type:Number,
    },
    image:{
        type:String,
    },
    title:{
        type:String,
        // require:true,
    },
    category:{
        type:String,
        // require:true,
        default:null
    },
    subCategory:{
        type:String,
        default:null
    },
    qty:{
        type:Number,
        default:1,
    },
    price:{
        type:Number,
        default:0

    },
    createdTime:{
        type:Number,
        default:Date.now()
    },
    updateTime:{
        type:Number,
        default:Date.now()
    }
})

const Product=new mongoose.model("products",productSchema);
module.exports=Product;
