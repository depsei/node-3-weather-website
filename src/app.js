const path=require('path')
const express =require('express')
const hbs=require('hbs')
const request=require('request')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')


const app=express()

//define path for express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res) => {
    res.render('index', {
        title : 'Weather' ,
        name : 'Divya'
    })})

app.get('/about',(req,res) => {
    res.render('about' , {
        title : 'About Me' ,
        name : 'Divya'
    })
})

app.get('/help',(req,res) => {
    res.render('help' , {
        title : 'Help me',
        name : 'Divya'
    })
})

app.get('/help/*',(req,res) => {
    res.render('404', {
        title : '404',
        name : 'Divya',
        errorMessage : ('Help article not found')
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address)
    {
        return res.send({
        error : "you must provide an address"
        })
    }

    geocode(req.query.address,(error, {latitude,longitude,location} ={}) => {
        if(error)
        {
            res.send({
                error
            })
        }

        forecast(latitude,longitude,(error,forecastData) => {
            if(error)
            {
                res.send({error})
            }
            res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })
        })
    })
    
})


app.get('/products', (req,res) => {
    if(!req.query.search)
    {
       return res.send({
            error : "you must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products : []
})
})

app.get('*', (req,res) => {
    res.render('404', {
        title : '404',
        name : 'Divya',
        errorMessage : 'Page not found'
    })
})




// app.get('',(req,res) =>
// {
//     res.send("Hello Express!")
// })

// app.get('/help',(req,res) =>
// {
//     res.send("Help page")
// }
// )
app.listen(3000,() =>
{
    console.log("server is up and running")
})