const express=require('express');

const helmet =require('helmet')
const router=require('./theRouter');

const app=express();
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));

app.use('/',router);


app.listen(3000,()=>{
    console.log('App router is running')
})