const request=require('request')

const forecast = (latitude,longitude,callback) =>
{
    url="https://api.darksky.net/forecast/9d2f2f95fa165d094e589ea65be7baa9/"+latitude+ "," +longitude+ "?units=si"

    request({url : url , json: true} , (error,response) => {
        if(error)
        {
            callback('Unable to vonnect to location',undefined)
        }
        else if(response.body.error)
        {
    
            callback('unable to find this location.try another',undefined)
        }
        else
        {
            console.log(response.body.daily.data[0])
            callback(undefined,"temperature: "+response.body.currently.temperature+ " degrees & chances of rain"+(response.body.currently.precipProbability*100)+"% . The high today is:"+response.body.daily.data[0].temperatureHigh+ 'and low today is'+response.body.daily.data[0].temperatureLow )
        }

    })
}   

module.exports = forecast