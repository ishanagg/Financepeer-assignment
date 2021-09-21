const mongoose = require('mongoose');
const crypto = require('crypto');
const { v1: uuidv1 } = require('uuid');

const jsonSchema = new mongoose.Schema(
    {
        userId:{
            type:Number,
            trim:true,
           // required: true,
        },
        id:{
            type:Number,
            trim:true,
            //required: true,
        },
        title: {
            type: String,
            trim: true,
            //required: true,
            maxlength: 32
        },
        body: {
            type: String,
            trim: true,
            //required: true,
            maxlength: 2000
        },
        
    },
    { timestamps: true }
);

module.exports = mongoose.model('Jsons', jsonSchema);