import React,{useState,useEffect} from 'react'
import Web3 from 'web3' 
import StorageHash from './abis/StorageHash.json'



export default function Loadblockchain() {


    const [blockdata,setBlockdata] = useState({
        contract:'',
        web3: null,
        account: ''
    })

    async function loadBlockchainData(){

        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        setBlockdata({...blockdata,account:accounts[0]})
        const networkId = await web3.eth.net.getId()
        const networkData = StorageHash.networks[networkId]

        console.log(blockdata['account'])

        if(networkData){
            const abi = StorageHash.abi
            const address = networkData.address
            const contract = web3.eth.Contract(abi,address)
            setBlockdata({...blockdata,contract:contract})

        }

    }

    async function loadWeb3(){
        if(window.ethereum){

            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
            console.log('enable')
      
          } if(window.web3){
      
            window.web3 = new Web3(window.web3.currentProvider)
            console.log(2)
      
          } else {
      
            window.alert('Please use Metamask!')
            console.log(3)
      
          }
    }

    // useEffect(() => {(
    //     async()=>{

    //         const web3 = window.web3
    //         const accounts = await web3.eth.getAccounts()
            


    //     }

    // )


    // }, [])

    useEffect(()=>{
        loadWeb3()
        loadBlockchainData()

    },[])

    function onSubmit(e){
        e.preventDefault()
        var data = '123qwe'
        var myContract = blockdata['contract']
        var account = blockdata['account']

        myContract.methods.set(data).send({from: account}, function(error, transactionHash){

            console.log(transactionHash)
            
          
        });


    }

    

    


  return (
    <div>
        <button onClick={onSubmit}>Click</button>

        <button onClick={()=>{

        console.log(blockdata)    

        }}>Click</button>

<p>{blockdata['account']}</p>


    </div>
  )
}
