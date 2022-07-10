import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import FileUpload from "react-material-file-upload";
import { Button, Grid } from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "./style.css"

const UploadFile = () => {
  const [file, setFile] = useState([]);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  const handleUpload = () => {
    let formdata = new FormData();
    setProgress(70);
    formdata.append("file", file[0]);
    axios
      .post("/operation/upload", formdata)
      .then((res) => {
        console.log(res)
      })
  }

  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }
  
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 1));
    }, 50);
    return () => {
      clearInterval(timer);
    };
  }, [progress])

  return (
    <div className="operation-upload">
      <Grid container spacing={4} className="upload-file">
        <Grid item xs={4}>
          <FileUpload value={file} onChange={setFile}/>
        </Grid>
        <Grid item xs={8} >
          <Button primary onClick={handleUpload}>send</Button>
          <LinearProgressWithLabel value={progress} />
        </Grid>
      </Grid>
    </div>
  )
}

export default UploadFile;