import React,{Component} from 'react'
import Web3 from 'web3' 



class App extends Component {


  async componentWillMount(){

    await this.loadWeb3();
    this.loadBlockchainData()

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

  async loadBlockchainData(){

    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    this.setState({account:accounts[0]})

  }



  constructor(props) {
    super(props)

    this.state = {
      storageHash: '',
      contract: null,
      web3: null,
      buffer: null,
      account: ''
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

  //chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#


  render(){
    return (

      <div>

  
          <p>{this.state.account}</p>
        
  
      </div>
  
     
    )
  }

}

export default App
