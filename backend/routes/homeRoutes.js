import express from 'express';
import {StoreToken, getData, getCurrentUserPlaylist} from '../controllers/homeController.js'

const router = express.Router();

router.post("/store-token", StoreToken);
router.get("/me", getData);
router.get("/me/playlists", getCurrentUserPlaylist)

export default router;