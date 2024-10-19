
// let fs = require('fs');
// let os = require('os');

// let user = os.userInfo()

// console.log(user.username);

// fs.appendFile('greeting.txt',`Hello ${user.username}\n`,()=>console.log("file created."));

var _ = require('lodash');

let b = [1,2,3,4,5,6,7,8,9,10,10,11,11,]

let uniqueB = _.uniq(b);

console.log(uniqueB);