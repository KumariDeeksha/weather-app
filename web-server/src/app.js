const path = require('path')
const express = require('express');


const app = express()
const publicDirectoryPath=path.join(__dirname, '../public');
const viewsPath=path.join(__dirname,'../templates')
app.set('view engine','hbs')
app.set('views',viewsPath)
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
})

//     geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
//         if (error) {
//             return res.send({ error })
//         }

//         forecast(latitude, longitude, (error, forecastData) => {
//             if (error) {
//                 return res.send({ error })
//             }

//             res.send({
//                 forecast: forecastData,
//                 location,
//                 address: req.query.address
//             })
//         })
//     })
// })

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Deeksha',
        errorMessage: 'Page not found.'
    })
})

app.listen(803, () => {
    console.log('Server is up on port 805.')

})