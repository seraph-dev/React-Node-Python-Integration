import express from 'express';
import path from 'path'
import { wrapAsync } from '../helpers.js';

const router = express.Router();

router.post('/upload', wrapAsync(async(req, res) => {
  // console.log(req.body)
  const __dirname = path.resolve(path.dirname(''));
  const newpath = __dirname + "/public/Supervised-Machine-Learning/data/";
  console.log(newpath)
  console.log(req.files)
  const file = req.files.file;
  const filename = file.name;
 
  file.mv(`${newpath}${filename}`, (err) => {
    if (err) {
      res.status(500).send({ message: "File upload failed", code: 200 });
    }
    res.status(200).send({ message: "File Uploaded", code: 200 });
  });
  }),
);

export default router;