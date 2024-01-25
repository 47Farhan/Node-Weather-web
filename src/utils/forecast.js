const request = require('request');
const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=58a5ffdc9c49818a490cee4bfd8ff245&query='+latitude+','+longitude+'&units=m';
    request({url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to the weather service!',undefined);
        }else if (response.body.error){
            callback('Unable to find the location',undefined)
        }else{
           
            callback(undefined, response.body.current.weather_descriptions[0]+' .It is '+response.body.current.temperature+' degress'+' but it feels like '+response.body.current.feelslike+' degree out');
        }
    })
}
module.exports=forecast;