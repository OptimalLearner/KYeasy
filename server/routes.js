const express=require('express');
const router=express.Router();
const dataController=require('./controller.js')

router.post('/submitInfo',dataController.submitInfo)