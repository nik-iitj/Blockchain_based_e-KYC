import React from 'react'
import Button from '@mui/material/Button';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import Stack from '@mui/material/Stack';



export const App = () => {

  function hello(){
    const user = {

      "id" : "MyID2",
      "name" : "UserName",
      "date" : "currentDate",
      "link" : "docLink",
      "status" : "pending"
    }

    let options = {
      method: 'POST',
      headers: {
          'Content-Type':
              'application/json'
      },
      body: JSON.stringify(user)
  }

  let fres = fetch('http://localhost:5000/do',options)

  fres.then(res => res.json()).then(d=>{
    console.log(d)
  })

  }

  return (

    <div>
      <Button variant="contained" onClick={hello}>Contained</Button>
      <Stack spacing={2} direction="row">

        <p1>In grogress</p1>
        <HourglassBottomIcon></HourglassBottomIcon>

      </Stack>  

    </div>

    

    
  )
}

export default App
