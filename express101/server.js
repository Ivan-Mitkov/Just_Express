const express=require('express');
const path=require('path');

const app=express();

app.use(express.static('public'));


app.get('/',(req, res)=>{
    // console.log(req.route)
    // res.send(`<h1>Welcome to the home GET page!`)
    res.sendFile(path.join(__dirname,'node.html'))
})
app.post('/',(req, res)=>{
    res.send(`<h1>Welcome to the home POST page!`)
})
app.delete('/',(req, res)=>{

})
app.put('/',(req, res)=>{

})
app.all('*',(req,res)=>{
    // Express handles the basic headers (status code, mime-type)!
    res.send('<h1>Homepage</h1>');  

     // Express handles the end! 
})

app.listen(3000,()=>{
    console.log('app is listening at port 3000')
})