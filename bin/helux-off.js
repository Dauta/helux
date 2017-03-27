const cp = require('child_process');
const path = require('path');
const fs = require('fs');
//get the last line of the text file
const file_contents = fs.readFileSync(__dirname + '/lib/pid.log').toString().split('\n');
//pid
let pid;
for(let i = 1; i < file_contents.length; i++){
  if(file_contents[file_contents.length - i] != ''){
    //assign pid
    pid = file_contents[file_contents.length - i].split('\'')[1].split(' ')[1];
    //exit the loop (duh)
    break;
  }
}
//kill the xflux process
process.kill(pid);
