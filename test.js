const express = require('express');
const cors = require('cors');
// const { PythonShell } = require('python-shell');

const app = express();
app.use(cors());

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.get("/apiTest", (req,res,next) => {

  // const {sentence} = req.params

  // let options = {
  //   scriptPath: "./",
  //   args: [sentence]
  //   // args: ["A dog is a furry animal that"]
  // }
  
  // PythonShell.run("test.py", options, (err, response) => {
  //   if (err) console.log(err);
  //   if (response) res.send({stuff: response[0]});;
  // })

  res.send({stuff: "hello"});

})