const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const cors_white_list = ["https://www.findpathway.com/","https://www.findpathway.com", "http://localhost:3000/", "http://localhost:3000","http://localhost:3001/","http://localhost:3001"];

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



    // var data = ["ss","date","linkk","pending"]
    // localStorage.setItem("data",data)

    res.json(arr)


})


app.post("/verifyStatus",(req,res)=>{

    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
      }

      const id = req.body.id



      var data = localStorage.getItem(id)

      const arr = data.split(",")

      arr[3]=req.body.status
      
      localStorage.setItem(req.body.id, arr);
    
})



app.listen(5000, ()=>{
    console.log("server is running")
})
