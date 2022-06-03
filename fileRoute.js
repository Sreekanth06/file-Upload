const route = require('express').Router();
const fileCtrl = require('../controller/fileCtrl');
const upload = require('../middleware/fileUpload');


route.get(`/`, fileCtrl.index);
route.get(`/home`, fileCtrl.index);
route.get(`/upload`, fileCtrl.fileUpload);

route.post(`/upload`,  upload, fileCtrl.newUpload);
route.get(`/delete/:id`, fileCtrl.deleteFile);


module.exports = route;