import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import FileUpload from "react-material-file-upload";
import { Button, Grid, InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "./style.css"

const UploadFile = () => {
  const [file, setFile] = useState([]);
  const [progress, setProgress] = useState(0);
  const [state, setState] = useState(0);
  const [percent, setPercent] = useState(0);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError1, setIsError1] = useState(false);
  const [isError2, setIsError2] = useState(false);
  const [modal, setModal] = useState(false);
  const [k, setK] = useState(0);

  const vertical = 'top';
  const horizontal = 'right';

  const handleUpload = () => {
    if (k == -1) {
      
    } else {
      let formdata = new FormData();
      setState(0);
      formdata.append("file", file[0]);
      axios
        .post("/operation/upload/" + k, formdata)
        .then((res) => {
          console.log(res)
          if (res.data.status == 0) {
            setState(40);
            setIsError1(true);
          } else if (res.data.status == 1) {
            setState(70);
            setIsError2(true);
          } else if (res.data.status == 2) {
            setState(100);
            setIsSuccess(true);
          }
        })
        .catch((err) => {
          console.log(err)
          setIsError1(true);
          setState(0);
        })
    }
  }

  useEffect(() => {
    console.log(file)
    setState(0)
    setProgress(0)
    setPercent(0)
  }, [file])

  useEffect(() => {
    const myInterval = setInterval(() => {
      let flag = 0;
      setPercent((prevProgress) => {
        if (prevProgress >=state) {
          flag = 1;
          return prevProgress
        } else {
          return prevProgress + 4;
        }
      })
      setProgress((prevProgress) => {
        if (prevProgress >=state) {
          flag = 1;
          return prevProgress
        } else {
          return prevProgress + 4;
        }
      })
      if (flag == 1) {
        console.log(flag)
        clearInterval(myInterval)
      }
    }, 100)
  }, [state])

  const handleSubscribe = () => {
    let data = document.getElementById("parameterK").value;
    setK(data);
    setModal(false);
  }

  return (
    <div className="operation-upload">
      <Grid container spacing={4} className="upload-file">
        <Grid item xs={4}>
          <FileUpload value={file} onChange={setFile}/>
        </Grid>
        <Grid item xs={8} >
          <SettingsApplicationsIcon onClick={() => {setModal(true)}} color="primary" sx={{fontSize: 80}} style={{marginBottom:"10px", cursor:"pointer"}}/>
          <Typography sx={{fontSize: 20}}>{percent}% uploaded</Typography>
          <LinearProgress variant="determinate" value={progress} className="fileupload-progressbar" style={{marginRight:"30px"}}/>
          <Button variant="contained" style={{marginTop:"10px",right: "30px", position: "absolute"}} onClick={handleUpload}>File post</Button>
        </Grid>
      </Grid>
      
      <Snackbar open={isSuccess} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal} autoHideDuration={4000} onClose={() => {setIsSuccess(false)}}>
        <MuiAlert onClose={() => {setIsSuccess(false)}} size={"large"} elevation={6} severity="success" sx={{ width: '100%' }} variant="filled">
          File uploading is success.
        </MuiAlert>
      </Snackbar>
      <Snackbar open={isError1} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal} autoHideDuration={4000} onClose={() => {setIsError1(false)}}>
        <MuiAlert onClose={() => {setIsError1(false)}} elevation={6} severity="error" sx={{ width: '100%' }} variant="filled">
          File uploading is error.
        </MuiAlert>
      </Snackbar>
      <Snackbar open={isError2} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal} autoHideDuration={4000} onClose={() => {setIsError2(false)}}>
        <MuiAlert onClose={() => {setIsError2(false)}} elevation={6} severity="error" sx={{ width: '100%' }} variant="filled">
          Python operation is error.
        </MuiAlert>
      </Snackbar>

      <Dialog open={modal} onClose={() => {setModal(false)}} fullWidth={true} maxWidth={"sm"}>
        <DialogTitle sx={{fontSize: 20}} style={{textAlign:"center", marginTop:"50px"}}>PARAMETER TURNING FORM</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            Parameter K
          </DialogContentText> */}
          <TextField
            margin="dense"
            id="parameterK"
            label="Parameter K"
            type="email"
            fullWidth
            variant="standard"
            className="dialog-content"
          />
          <TextField
            margin="dense"
            id="name"
            label="Dummy text Parameter"
            type="email"
            fullWidth
            variant="standard"
            className="dialog-content"
          />
          <FormControl variant="standard" sx={{ minWidth: "100%" }} className="dialog-content">
            <InputLabel id="demo-simple-select-standard-label">Dropdown selection</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Select"
            >
              <MenuItem value={10}>Ten</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {setModal(false)}} sx={{fontSize:20}}>Cancel</Button>
          <Button onClick={handleSubscribe} sx={{fontSize:20}}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default UploadFile;