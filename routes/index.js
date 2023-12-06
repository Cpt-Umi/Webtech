import express from 'express'
const router = express.Router();
import { db } from '../models/index.js'


// router.get("/", (req, res) => {
//     res.render("index.html");
// });


router.get('/msg', (req, res) => {
    res.json({ msg: 'Hello World' });
});




export default router;
