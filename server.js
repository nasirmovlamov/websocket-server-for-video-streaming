const express = require('express');
const cors  = require('cors');



// const app = express();
// app.use(cors());


// const buffer = []

// app.get('/', (req, res) => {
//     console.log(buffer)
//     res.send(buffer[0]);
// });


// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });




let webSocket=require('ws')

var wsPing=new webSocket.Server({port:8080})

const clients = new Set()


wsPing.on('connection',(socket,req)=>{
  const url = req.url
  const params = new URLSearchParams(url.split('?')[1])
  const id = params.get('id')
  clients.add(socket)

  
  
  socket.on('message', (deserialized_data)=> {
    clients.forEach(client => {
      if(client !== socket){
        client.send(deserialized_data.toString())
      }
    })
  })

})
