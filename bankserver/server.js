const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const {Web3Storage} = require('web3.storage')
const {getFilesFromPath} = require('web3.storage')
const fs = require('fs')

const cors_white_list = ["https://www.findpathway.com/","https://www.findpathway.com", "http://localhost:3000/", "http://localhost:3000","http://localhost:3001/","http://localhost:3001"];

function getAccessToken () {

    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDJmMzZiOTVGZTY3YzI2QTZEY0ExMzZkNTQ0Mjk2OWJEOWVlZkE5ODEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjY4MDcwMzAxNDAsIm5hbWUiOiJtZW1lIn0.pYkvLTLy6YiZwVeovTWYQZodui2kjiT2LZr44Tjmkd8'
  
}

function makeStorageClient () {
    return new Web3Storage({ token: getAccessToken() })
}

async function storeFiles (files,req) {
    const client = makeStorageClient()


    try {

        const cid = await client.put(files)

        console.log('stored files with :', cid)

        if (typeof localStorage === "undefined" || localStorage === null) {
            var LocalStorage = require('node-localstorage').LocalStorage;
            localStorage = new LocalStorage('./scratch');
          }
    
        const id = req.body.id
    
        var data = localStorage.getItem(id)
    
        const arr = data.split(",")
    
        arr[3]=req.body.status
    
    
        arr.push(cid)

        
        localStorage.setItem(req.body.id, arr);


    } catch(error){
        console.log(error)
    }

}

async function getFiles (path,req) {

    const files = await getFilesFromPath(path)
    console.log(`read ${files.length} file(s) from ${path}`)
    const cid = await storeFiles(files,req)
    return cid
}

app.use(cors({
    origin:cors_white_list,
    credentials:false,
  }))

  app.use(express.urlencoded({ extended: true }))
  app.use(bodyParser.json());

app.get("/api",(req,res)=>{ 
    res.json({"users" : ["user1","user2","user3"]})

})

app.post("/do",(req,res)=>{

    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
      }

      var data = []

      data.push(req.body.name);
      data.push(req.body.date)
      data.push(req.body.link)
      data.push(req.body.status)
      
      localStorage.setItem(req.body.id, data);
    
})

app.get("/getRequests",(req,res) =>{

    const arr = {};

    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');

    for(var i = 0; i<localStorage.length;i++){

        k = localStorage.key(i)
        arr[k] = localStorage.getItem(k)
    }

    res.json(arr)


})


app.post("/verifyStatus",(req,res)=>{



    const status = req.body.status;

    if(status === 'Accepted'){
        const cid = getFiles('files/',req)
    }
    else{

        if (typeof localStorage === "undefined" || localStorage === null) {
            var LocalStorage = require('node-localstorage').LocalStorage;
            localStorage = new LocalStorage('./scratch');
        }

        const id = req.body.id

        var data = localStorage.getItem(id)

        const arr = data.split(",")

        arr[3]=req.body.status
        localStorage.setItem(req.body.id, arr);

    }

      
    
})

//https://bafybeiav5m7543cxuiebrdwqidlhfpgl7azixrhllm5sl7p467w265v654.ipfs.w3s.link/

app.listen(5000, ()=>{
    console.log("server is running")
})
