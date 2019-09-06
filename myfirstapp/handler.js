'use strict';
const _ = require("lodash");
const request = require('request');
const https = require('https')


module.exports.hello = async event => {
var a = _.compact([0, 1, false, 2, '', 3]);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        lodash: a,
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.holidays = async event => {

  const promise = new Promise(function(resolve, reject) {
      https.get('https://www.schulferien.eu/downloads/ical4.php?land=1&type=1&year=2019', (res) => {
          // resolve(res.statusCode)

          let data = '';

            // A chunk of data has been recieved.
            res.on('data', (chunk) => {
              data += chunk;
            });

            // The whole response has been received. Print out the result.
            res.on('end', () => {
              // console.log(JSON.parse(data).explanation);
              resolve(data);
            });

        }).on('error', (e) => {
          reject(Error(e))
        })
      })
    return promise
  };
