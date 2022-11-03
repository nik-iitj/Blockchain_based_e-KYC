import React,{Component} from 'react'
import Web3 from 'web3' 



class App extends Component {


  async componentWillMount(){

    await this.loadWeb3();

  }

  async loadWeb3(){
    if(window.ethereum){

      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()

    } if(window.web3){

      window.web3 = new Web3(window.web3.currentProvider)

    } else {

      window.alert('Please use Metamask!')

    }
  }

  constructor(props) {
    super(props)

    this.state = {
      memeHash: '',
      contract: null,
      web3: null,
      buffer: null,
      account: null
    }
  }

  // function hello(){
  //   const user = {

  //     "id" : "MyID2",
  //     "name" : "UserName",
  //     "date" : "currentDate",
  //     "link" : "docLink",
  //     "status" : "pending"
  //   }

  //   let options = {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type':
  //             'application/json'
  //     },
  //     body: JSON.stringify(user)
  // }

  // let fres = fetch('http://localhost:5000/do',options)

  // fres.then(res => res.json()).then(d=>{
  //   console.log(d)
  // })

  // }


  render(){
    return (

      <div>

  
          <p1>In grogress</p1>
        
  
      </div>
  
     
    )
  }

}

export default App
