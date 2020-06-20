const express = require('express')
const {spawn} = require('child_process');
const bodyParser  = require("body-parser");
const port = 3000;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get('/' , (req,res)=>{
	res.render("landing.ejs");
})

app.post('/predict', (req, res) => {
 
 var dataToSend;
 // spawn new child process to call the python script
 const python = spawn('python', ['prob.py' , req.body.txt]);
 // collect data from script
 python.stdout.on('data', function (data) {
  // console.log('Pipe data from python script ...');
  dataToSend = data.toString();
 });
 // in close event we are sure that stream from child process is closed
 python.on('close', (code) => {
 // console.log(`child process close all stdio with code ${code}`);
 // send data to browser
 res.render("prediction" , {dataToSend})
 });

//  app.get('/predict' , (req,res)=>{
// 	res.render("prediction");
// }) 
})
app.listen(port, () => console.log(`Example app listening on port 
${port}!`))