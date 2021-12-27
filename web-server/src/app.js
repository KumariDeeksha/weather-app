const path = require('path')
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast =require('./utils/forecast')

const port = process.env.PORT || 800

const app = express()
const publicDirectoryPath=path.join(__dirname, '../public');
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    // res.send('hello')
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Deeksha'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Helping text.',
        title: 'Help',
        name: 'Deeksha'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Provide an address!'
        })
    }
    else{
        geocode(req.query.address, (error, { latitude, longitude, location } ) => {
            if (error) {
                return res.send({ error })
            }
    
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }
    
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        })
    }
})
// app.get('/products', (req,res)=>{
//     if(!req.query.search)
//     {
//        res.send({
//            error:'provide a search term'
//        })
//     }
//     console.log(req.query.search)
//     return res.send({
//         product:[]
//     })
// }
// )

   


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Deeksha',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})