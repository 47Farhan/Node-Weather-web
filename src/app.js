const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public/');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//Setup handle bars engine 
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'farhan'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'farhan'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message:'You can ask for help',
        name:'farhan'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an Address'
        })
    }
    const address = req.query.address;
    geocode(address,(error,{latitude, longitude,location}={}  )=>{
        
        if(error){
            return res.send({
                error
            })
        }
    
        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                forecast:forecastData,
                location,
                address
            });
          })
        
    })
   
  
})

app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
        
    }

    console.log(req.query.search)
    res.send({
        products:[]
    });
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        message:'Help article not found',
        name:'farhan'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        message:'Page not found',
        name:'farhan'
    })
})



app.listen(3000,()=>{
    console.log('Server is up on port 3000')
});