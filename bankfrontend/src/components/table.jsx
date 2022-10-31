import React,{useEffect,useState} from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import {Box, Button, Stack} from '@mui/material';

export default function Table(props) {


  const rows = [
    { id: 1, name: 'Snow', date: '16 Aug', doc: 'link' },
  ];

  const [currentRequests,setCurrentRequests] = useState([])

  useEffect(()=>{
    
    const newRows = []
    console.log(props.requests)
    for (const [key, value] of Object.entries(props.requests)) {
  
      var x = {}
      const arr = value.split(",")
      
      if(arr[3]!=="pending"){
        continue

      }

      x['id'] = key
      x['name'] = arr[0]
      x['date'] = arr[1]
      x['doc'] = arr[2]
      x['status'] = arr[3]
      newRows.push(x)
    }

    

    setCurrentRequests(newRows)


  },[props.requests])


  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
    {

      field:'date',
      headerName:'Date',
      width:150

    },

    {
      field: 'doc',
      headerName: 'Documents',
      width: 210,
      editable: true,
    },

    {

      field:'Action',
      width:210,
      renderCell: (cellValues)=>{
        return(

          <Stack direction="row" spacing={2}>
            <Button 
            variant="contained"
            color="success"
            onClick={(event)=>{
              event.preventDefault()

              const status = {

                "id": cellValues.id,
                "status" : "Accepted"

              }

              let options = {
                method: 'POST',
                headers: {
                    'Content-Type':
                        'application/json'
                },
                body: JSON.stringify(status)
            }

            let fres = fetch('http://localhost:5000/verifyStatus',options)

            fres.then(res => res.json()).then(d=>{
              console.log(d)
            })

              console.log(cellValues.tabIndex)
              const rows = [...currentRequests]
              rows.splice(rows.index,1)
              setCurrentRequests(rows)
              

            }}>
              Accept

            </Button>

            <Button 
          variant="contained"
          color="error"
          onClick={(event)=>{
            event.preventDefault()
            const status = {

              "id": cellValues.id,
              "status" : "Rejected"

            }

            let options = {
              method: 'POST',
              headers: {
                  'Content-Type':
                      'application/json'
              },
              body: JSON.stringify(status)
          }

          let fres = fetch('http://localhost:5000/verifyStatus',options)

          fres.then(res => res.json()).then(d=>{
            console.log(d)
          })

            console.log(cellValues.tabIndex)
            const rows = [...currentRequests]
            rows.splice(rows.index,1)
            setCurrentRequests(rows)

          }}>
            Reject

          </Button>

          </Stack>




        )

      }


    }
  ];


  return (
    <Box sx={{ height: 400, width: '50%' }}>
    <DataGrid
      rows={currentRequests}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      disableSelectionOnClick
      experimentalFeatures={{ newEditingApi: true }}
    />
          {/* {(props.requests.length === 0) ? (

<p>No requests</p>

): (

Object.keys(props.requests).map(function(key){

  return <p key={key}>{props.requests[key]}</p>

})


)} */}

  </Box>
  )
}
