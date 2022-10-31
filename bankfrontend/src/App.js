import React,{useEffect, useState} from 'react'
import Navbar from "./components/navbar"
import Table from "./components/table"
import { Box, Stack } from '@mui/material';


function App() {

    const [requests,setRequests] = useState({})

    useEffect(()=>{

      fetch("http://localhost:5000/getRequests").then(response => response.json()).then(
  
        data=>{
        
          setRequests(data)
          
        }
  
        )

  
    },[])



  return (
    <Box>
      <Navbar/>
      <Stack>
        <Table requests={requests}/>
      </Stack>  
    </Box>
  )
}

export default App