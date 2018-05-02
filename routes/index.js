// letiable declaration
const express = require('express');
const router = express.Router();
const ip = require('ip');
const multer = require('multer');
const qr = require('qr-image');
const fs =require('fs');
const rimraf = require('rimraf');


// Multer config
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
         cb(null, './public/img/uploads')
    },
    filename: (req, file, cb) => {
        let ext = file.originalname.split('.').pop();
        cb(null, file.fieldname + '-' + Date.now() + '.' + ext);
    }
});


/* GET home page. */
router.get('/',(req, res, next) => {
	try{
		rimraf('./public/img/uploads/*', function () { console.log('done'); });
	} catch(e){
		console.log('err from rimraf task:'+e)
	}
	res.render('index', { title: 'Title', session : req.session, success: req.flash('success','') ,error: req.flash('error',''),svg_string: null,ip: process.env.ip});

});

router.post('/', (req,res,next) => {
	let filename = null;
	let upload = multer({ 
		storage : storage,
		limits: { fileSize: 10 * 1000 * 1000 },
		fileFilter: (req, file, cb) => {
	       let type = file.mimetype;
	       if (type !== 'application/pdf' && type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && type !== 'image/png' && type !== 'image/jpg' && type !== 'image/jpeg') {
	         cb(new Error('extensionError'));
	       } else {
	         cb(null, true);
	       }
	   	}
	}).fields([
		{name: 'file',maxcount:1}
	]);

	upload(req, res, (err) => {
		if(err){
			console.log(err);
			if(err =='Error: extensionError'){
				console.log('Upload error! You can only upload following file types: pdf, doc, docx, xls, jpg, jpeg, png and gif');
				res.json({
					status :false,
					msg: 'Upload error! You can only upload following file types: pdf, doc, docx, xls, jpg, jpeg, png and gif'
				});
			}
			else if(err == "Error: File too large"){
				console.log('Upload file too large!');
				res.json({
					status :false,
					msg: 'Upload file too large!'
				});
			}	
			else{
				console.log('Something went wrong while uploading file(s).Please try again.');
				res.json({
					status :false,
					msg: 'Something went wrong while uploading file(s).Please try again.'
				});
			}
		}
		else{
			if(req.files['file'] != undefined){
				filename = req.files['file'][0].filename;
			}
			// console.log('http://'+ process.env.ip + '/img/uploads/'+filename);
			let svg_string = qr.imageSync('http://'+ process.env.ip + '/img/uploads/'+filename, { type: 'svg' });
			console.log('svg_string'+svg_string);

			res.json({
				status: true,
				svgContent: svg_string,
				msg: 'Success'
			});

		}
	});
});

module.exports = router;
