import express from 'express';
import path from 'path'
import { wrapAsync } from '../helpers.js';
import { spawn } from 'child_process';
import fs from 'fs';
import {PythonShell} from 'python-shell';
import * as OperationService from "../services/operation.js";

const router = express.Router();

router.get("/", wrapAsync(async(req,res) => {
    res.json(await OperationService.getOperation())
  })
)

router.post('/upload/:id', wrapAsync(async(req, res) => {
  // console.log(req.body)
  const __dirname = path.resolve(path.dirname(''));
  const rootpath = __dirname + "/public/Supervised-Machine-Learning";
  const newpath = rootpath + "/data/K" + req.params.id + "/";

  fs.mkdir(path.join(rootpath + "/data/", 'K'+req.params.id), (err) => {
    if (err) {
        return console.error(err);
    }
    console.log('Directory created successfully!');
  });
  
  const file = req.files.file;
  const filename = file.name;


  fs.readFile(newpath + filename, (err, data) => {
    if (err == null) {
      res.status(200).json({status:10})
    } else {
      file.mv(`${newpath}${filename}`, (err) => {
        if (err) {
          res.status(200).send({ status: 0, code: 200 });
        } else {
          let dataToSend;
          const file = newpath + filename;
          let options = {
            mode: "text",
            pythonOptions: ['-u'],
            scriptPath: rootpath,
            args: [5, file]
          }
          PythonShell.run('main.py', options, async function  (err, result) {
            if (err) {
              console.log("err", err)
              return res.status(200).json({status:1, code:200})
            } else {
              console.log("result", result)
              let dbres = await OperationService.createOperation({parameter: req.params.id, filename, result})
              console.log(dbres)
              dataToSend = result;
              return res.status(200).json({ status: 2, data: dataToSend, code: 200 });
            }
          })
        }
      });
    }
  })
  
  }),
);

router.get('/', (req, res) => {
  
})
export default router;