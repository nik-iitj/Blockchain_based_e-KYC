import React,{useEffect, useState} from 'react'




import Login from './Login';
import Dashboard from './dashboard/Dashboard'


function App() {


  var [flag, setFlag] = useState(true);

var setFlag2 = (val) => {
  setFlag(val);
}


  return (
    <div>
    {flag?<Login setFlag={setFlag2}/>:<Dashboard/>}
    </div>
  )
}

export default App