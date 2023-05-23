const http= require("http")

const server = http.createServer((resq,res)=>{
       res.end("mi primer nundo en node")
})

server.listen(8080,()=>{
  console.log("servidor escuchando en el puerto")
})