const http = require('http'); 

let i = 0; 

const server = http.createServer((req, res) => {
if(res){
    
    console.log(i++)
}
  
    res.end('hello')
})

server.listen(3001, () => {
    console.log('Server listening on port : 3001')
})