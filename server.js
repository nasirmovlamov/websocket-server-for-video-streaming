const express = require('express');
const cors  = require('cors');



const PORT = process.env.PORT || 8080;

const server = express()
.use((req, res) => res.sendFile(INDEX, { root: __dirname }))
.listen(PORT, () => console.log(`Listening on ${PORT}`));


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






const { Server } = require('ws');

const wss = new Server({ server });


const clients = new Set()


wss.on('connection',(socket,req)=>{
  clients.add(socket)
  console.log(socket)
  socket.on('message', (deserialized_data)=> {
    clients.forEach(client => {
      if(client !== socket){
        client.send(deserialized_data.toString())
      }
    })
  })

})

