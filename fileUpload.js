const express = require('express');
const multer = require('multer');
const path = require('path');


// validate file  


// Storage

const myStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, "upload/")
    },
    filename: (req,file,cb) => {
        // cb(null, `${file.originalname}`)
        cb(null, `${new Date().getTime().toString()}-${file.fieldname}${path.extname(file.originalname)}`)
    }
})

// upload logic 


const upload = multer({
    storage: myStorage,         
    limits: {fileSize: 50 * 1024 * 1024} // allow to access with in the 50MB
}).single("myFile");


module.exports = upload;