import React,{Component} from 'react'
import Web3 from 'web3' 
import StorageHash from './abis/StorageHash.json'

import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';





class App2 extends Component {


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
    this.setState({web3:web3})
    const accounts = await web3.eth.getAccounts()
    this.setState({account:accounts[0]})
    const networkId = await web3.eth.net.getId()
    const networkData = StorageHash.networks[networkId]
    if(networkData){

      const abi = StorageHash.abi
      const address = networkData.address
      const contract = web3.eth.Contract(abi,address)
      this.setState({contract})

      // const storageHash = await contract.methods.get().call()
      // console.log(storageHash)
      var myaccount = this.state.account

      contract.methods.get().call({from: myaccount}, function(error, result){
        console.log(result)
    });
      
      


    } else {

      window.alert('smart contract not deployed')

    }

  }



  constructor(props) {
    super(props)

    this.state = {
      storageHash: '',
      contract: null,
      web3: null,
      buffer: null,
      account: '',
      showNotif:false,
      IPFS_hash:'',
      transaction_hash:''
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

  onSubmit = (event)=>{

    var data = '123abc'
    console.log(this.state.account)

    var myContract = this.state.contract
    var account = this.state.account


    myContract.methods.set(data).send({from: account}, function(error, transactionHash){

      console.log(transactionHash)
      this.setState({transaction_hash: transactionHash})
      
      
  }.bind(this));
  

  }

  onRequest = (event)=>{


    fetch("http://localhost:5000/getRequests").then(response => response.json()).then(

      data=>{
      
        
        for(const [key,value] of Object.entries(data)){

          if(key==="MyID2"){

            const arr = value.split(",")
            if(arr[3]==="Accepted"){
              this.setState({showNotif : true})
              this.setState({IPFS_hash: arr[4]})
              console.log('done')
            }

          }

        }
        
      }

      )



  }

  transactionHistory = (event)=>{

    console.log(this.state.transaction_hash)
    console.log(this.state.web3)
    const web3 = this.state.web3

    web3.eth.getTransaction(this.state.transaction_hash, function(err, result) {
      if (result.value) {
          // console.log(web3.utils.fromWei(result.value, 'ether'));
          console.log(result)
      }
  });

  }


  render(){
    return (

      <div>
        {this.state.showNotif ? <Alert color='info'
        action={
          <Button size="large" color="primary" variant='outlined' onClick={this.onSubmit}>
            Confirm
          </Button>
          }
        >
        Your KYC request has been approved by the bank! The storage hash for your files is : <h3> {this.state.IPFS_hash}</h3>. Please confirm to add this to the blockchain network.
        </Alert> : <></>}

          <p>{this.state.account}</p>
    


        <Button color='primary' onClick={this.onRequest}>Button</Button>
        <Button onClick={this.transactionHistory}> Transaction</Button>
  
      </div>
  
     
    )
  }

}

export default App2
