const request=require('request')


const geocode=(address,callback)=>{
    const geocodeurl='https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?limit=1&access_token=pk.eyJ1Ijoic2F1bXljaGF1ZGhhcnkiLCJhIjoiY2t4OWEwamNxMjhjbjJubzFzOGtjaDFrMiJ9.mr6uvpjXdMJBnr1SfQ6bqg'

    request({ url : geocodeurl, json:true },(error,response)=>{
    if(error){
        callback('Unable to connect to location services!',undefined)
    }
    else if(response.body.features.length === 0){
    callback('Unable to find location.',undefined)}
    else{
        callback(undefined,{
            'latitude':response.body.features[0].center[1],
            'longitude':response.body.features[0].center[0],
            'location':response.body.features[0].place_name
        })
    }
    })
}
 module.exports=geocode