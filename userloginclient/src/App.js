import React,{useEffect, useState} from 'react'



import Login from './Login';
import App2 from './App2'
import Loadblockchain from './Loadblockchain';


function App() {


  var [flag, setFlag] = useState(true);

var setFlag2 = (val) => {
  setFlag(val);
}


  return (
    <div>
      <App2/>
    {/* {flag?<Login setFlag={setFlag2}/>:<App2/>} */}
    </div>
  )
}

export default App