const cp = require('child_process');
const fs = require('fs');
const { get } = require('axios');
//location taken from arguments list
const location = process.argv[2];
//check the input
if(!location){
  console.log('ERROR: Please, include your location using the following syntax:\nhelux-on {YOUR LOCATION}');
  process.exit(1);
}
//geocode
const geocode = async (location) => {
  const result = 
    await get(`https://nominatim.openstreetmap.org/search/${location}?format=json&limit=1`);

  const { lat, lon, display_name } = result.data[0];
  //execute xflux with extracted coordinates
  let xflx = cp.spawn(__dirname + '/xflux', ['-l', lat, '-g', lon], {detached: true, stdio: ['ignore', 'pipe', 'pipe']});
  //catch the output
  xflx.stdout.on('data', (data)=>{
    fs.writeFile(__dirname+'/lib/pid.log', data.toString(), ()=>{
      //detach child from this process
      xflx.unref();
      //display the output
      console.log('Enjoy using Helux!\nCurrent location is ' + display_name);
      //kill the parent process
      process.exit(0);
    });
  });
}

//launch
geocode(location);