const cp = require('child_process');
// const fs = require('fs');
const { get } = require('axios');
// location taken from arguments list
const location = process.argv[2];
// check the input
if (!location) {
  console.log('Please, provide your location using the following syntax:');
  console.log('helux {YOUR LOCATION}');
  process.exit(1);
}

const geocode = async location => {
  const result = await get(
    `https://nominatim.openstreetmap.org/search/${location}?format=json&limit=1`
  );

  const { lat, lon, display_name } = result.data[0];
  //execute xflux with extracted coordinates
  const xflux = cp.spawn(__dirname + '/lib/xflux', ['-l', lat, '-g', lon], {
    detached: true,
    stdio: ['ignore', 'pipe', 'pipe']
  });
  
  xflux.stdout.on('data', () => {
    // detach child from this process
    xflux.unref();
    // display the output
    console.log(`Current location is ${display_name}`);
    console.log('Enjoy using Helux');
    // kill the parent process
    process.exit(0);
  });
};

geocode(location);
