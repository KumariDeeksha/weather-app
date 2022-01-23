const request=require('request')


const geocode=(address,callback)=>{
    // const geocodeurl='https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?limit=1&access_token=pk.eyJ1Ijoic2F1bXljaGF1ZGhhcnkiLCJhIjoiY2t4OWEwamNxMjhjbjJubzFzOGtjaDFrMiJ9.mr6uvpjXdMJBnr1SfQ6bqg'
    const geocodeurl=`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?limit=1&access_token=pk.eyJ1Ijoic2F1bXljaGF1ZGhhcnkiLCJhIjoiY2t4OWEwamNxMjhjbjJubzFzOGtjaDFrMiJ9.mr6uvpjXdMJBnr1SfQ6bqg`;

    request({ url : geocodeurl, json:true },(error,res)=>{
    if(error){
        callback('Unable to connect to location services!',undefined)
    }
    else if(JSON.parse(res.body).features.length === 0){
    callback('Unable to find location.',undefined)}
    else{
       const d=JSON.parse(res.body)
       const data={
            latitude:d.features[0].center[1],
            longitude:d.features[0].center[0],
            location:d.features[0].place_name
       }
        }
        callback(undefined,data)
    })

}  

 module.exports=geocode;