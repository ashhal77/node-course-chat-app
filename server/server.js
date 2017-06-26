const path = require('path');
const express = require('express');


const publicPath = path.join(__dirname, '../public');
var app = express();
app.use(express.static(publicPath));

const port = process.env.PORT || 3000;


//comment
app.listen(port, ()=>{
	console.log(`the server is up pn port ${port}`);
});