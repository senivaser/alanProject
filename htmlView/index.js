const { filenames, getNumber, fileProcessData } = require("./src")
const express = require('express')
const cors = require('cors')
const app = express()

let tableData = []
console.log("Waiting for server start...")

const main = async () => {
  const filelist = (await filenames()).sort(
    (a,b) => getNumber(a) - getNumber(b) 
  )
  for(file of filelist) {
    let data = await fileProcessData(file)
    tableData = [...tableData, ...data]
  }

  // console.log(tableData)
}


main().then(() => {
  
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Content-Type', 'application/json')
    next();
  });
  
  app.get('/', (req, res) => {
    console.log('qq')
    res.json(tableData)
  })

  app.listen(3000, console.log(`Server has started on port ${3000}`))
})



