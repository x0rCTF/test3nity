"use strict";

const AWS = require("aws-sdk");
const axios = require("axios");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const config = require('./places.json');

module.exports.a = async (event, context, callback) => {
  const openWeatherMapAPIURL = config;


  console.log(openWeatherMapAPIURL);
  console.log(openWeatherMapAPIURL.places[0].city);


//   const params = {
//     TableName: process.env.DYNAMODB_TABLE_NAME,
//     Item: {
//       city: openWeatherMapAPIURL.places[0].city,
//       country: openWeatherMapAPIURL.places[0].country
//     },
//   };

//   dynamoDb.put(params, (error) => {
//     // handle potential errors
//     if (error) {
//       console.log(error);
//       console.error(error);
//       return;
//     }
//   });

  // create a resonse
  const response = {
    statusCode: 200,
    body: JSON.stringify({ SYSTEM: "Message sent to SNS" }),
  };
  callback(null, response);
};