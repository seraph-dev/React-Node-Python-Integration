import React from "react"
import { Grid, Button, Dialog, DialogTitle, DialogContent, Table, TableHead, TableRow, 
  TableCell, TableBody
} from "@mui/material";
import MUIDataTable from "mui-datatables";
import axios from "axios"

import UploadFile from "../../components/UploadFile"
import { useEffect, useState } from "react";

const Operation = () => {
  const [datatableData, setDatatableData] = useState([]);
  const [view, setView] = useState(true);
  const [table, setTable] = useState({
    title: "",
    content: []
  });
  const array = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

  useEffect(() => {
    axios
      .get("/operation")
      .then((res) => {
        console.log(res)
        let data = [];
        let item = [];
        res.data.map(i => {
          item.push(i.filename)
          item.push(i.updatedAt)
          item.push("")
          item.push("K=" + i.parameter)
          item.push(i.Precisão)
          item.push(i.Revocação)
          item.push(i.Acurácia)
          data.push(item)
          item = []
          return;
        })
        setDatatableData(data)
      })
  }, [])

  const handleView = (index) => {
    setView(false)
    setTable({
      title: datatableData[index][0],
      content: [
        datatableData[index][4],
        datatableData[index][5],
        datatableData[index][6],
      ]
    })
  }

  return(
    <div>
      {view?
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="History-List"
            data={datatableData}
            columns={["File name", "Uploaded date", {
              label: "Button",
              options: {
                  customBodyRender: (value, tableMeta, updateValue) => {
                      return (
                        <>
                          <Button variant="contained" color="primary" onClick={() => handleView(tableMeta.rowIndex) } style={{marginRight:"20px"}}>
                            View
                          </Button>
                          <Button variant="contained" color="error" onClick={() => console.log(value, tableMeta) }>
                            Delete
                          </Button>
                        </>
                      )
                  }
              }}, "Parameters"]}
            options={{
              filterType: "checkbox"
            }}
          />
        </Grid>
      </Grid>
      :
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={() => {setView(true)}} 
              style={{position: "absolute",right: "30px",marginTop: "20px"}}
          >Back</Button>
          <Table style={{background:"white", marginTop: "80px"}}>
            <TableHead>
              <TableRow>
                <TableCell>Precisão</TableCell>
                <TableCell>Revocação</TableCell>
                <TableCell>Acurácia</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {array.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{table.content[0]}</TableCell>
                  <TableCell>{table.content[1]}</TableCell>
                  <TableCell>{table.content[2]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
        </Grid>
      </Grid>
      }
    </div>
  )
}

export default Operation