import express from 'express';

import { fetch,create,update, deletes } from '../controller/usercontroller.js'; 

const router = express.Router();

router.get('/fetch', fetch); 
router.post('/create', create);
router.put('/update/:id', update);
router.delete('/delete/:id',deletes);
export default router;
