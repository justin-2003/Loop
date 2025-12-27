import express from 'express';
import {StoreToken, getData} from '../controllers/homeController.js'

const router = express.Router();

router.post("/store-token", StoreToken);
router.get("/me", getData);

export default router;