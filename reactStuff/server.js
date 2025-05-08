const express = require("express");
const path = require("path");
const app = express();
// enable cors 
// Serve static files from dist directiory
app.use(express.static(path.join(__dirname,'dist')));
// Serve all other routes to index.html
app.get("*",(req,res) => 
{
    res.sendFile(path.join(__dirname,'dist','/home/index.html'))
});
//start server
const port = process.env.PORT || 8000;
app.listen(port, () => {console.log(`server is running on port ${port}`);
})
