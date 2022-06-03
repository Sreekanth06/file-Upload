const File = require('../model/fileModel');
const fs = require('fs')


const fileCtrl = {
    index: async (req,res) => {
        try {
            let data = await File.find();
            // console.log(`files =` data);
            res.render('index.pug', {files: data });
        } catch (err) {
            console.log(err.message);
        }
        res.render(`index.pug`);
    },
    fileUpload: (req,res) => {
        res.render("upload.pug");
    },
    newUpload: async (req,res) => {
        try {
            // console.log(`file data =`, req.file);

            const newFile = await File(req.file);
            console.log(`file =`, newFile);

            let extFile = await File.findOne({originalname: newFile.originalname});
                if(extFile) {
                    fs.unlink(newFile.path, function(){
                        console.log(`file removed from location`);
                    });
                    console.log(`file already exists`);
                } else {
                    await newFile.save();
                    console.log(`File successfully uploaded`);
                }


            res.redirect(`/`);
        } catch (error) {
            console.log(`err.message`);
        }
    },

    deleteFile: async (req,res) => {
        try{
            const id = req.params.id;
            console.log('delete id =', id);

            File.findById({_id: id}, (err,data) => {
                if(err) throw err;
                // console.log(`data =`, data);
                fs.unlink(data.path, function(){
                    console.log(`file delete successfully`);
                });
            });


            await File.findByIdAndDelete(id);
            console.log(`file deleted successfully`);
            res.redirect("/");
        } catch (err ){
            console.log(err.message);
        }
    }
}

module.exports = fileCtrl;