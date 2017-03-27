const cp = require('child_process');
const path = require('path');
const fs = require('fs');
const geocoder = require('geocoder');
//location taken from arguments list
const location = process.argv[2];
//check the input
if(!location){
  console.log('ERROR: Please, include your location using the following syntax:\nhelux-on {YOUR LOCATION}');
  process.exit(1);
}
//geocode
geocoder.geocode(location, (err, geo)=>{
  //address
  const address = geo.results[0].formatted_address;
  //coordinates
  const lat = geo.results[0].geometry.location.lat;
  const lon = geo.results[0].geometry.location.lng;
  //execute xflux with extracted coordinates
  let xflx = cp.spawn(__dirname + '/xflux', ['-l', lat, '-g', lon], {detached: true, stdio: ['ignore', 'pipe', 'pipe']});
  //catch the output
  xflx.stdout.on('data', (data)=>{
    fs.writeFile(__dirname+'/lib/out.log', data.toString(), ()=>{
      //detach child from this process
      xflx.unref();
      //display the output
      console.log('Helux is on\nCurrent location:', address);
      //kill the parent process
      process.exit(0);
    });
  })
})
