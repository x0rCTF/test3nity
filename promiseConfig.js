"use strict";

const AWS = require("aws-sdk");
const axios = require("axios");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const config = require('./places.json');
const uuid = require('uuid');

module.exports.config = async (event, context, callback) => {



const openWeatherMapAPIURL = config;

const openWeatherMapAPIData = `http://api.openweathermap.org/data/2.5/weather?q=prilep&appid=15ea876c6db456422c681b5ba377ec0a&units=metric`;
    const currentWeather = await axios
    .get(openWeatherMapAPIData)
    .catch((error) => {
      console.log(error);
      return;
    });  


function promiseOne (i) {

    
const params = {
    TableName:process.env.DYNAMODB_TABLE_NAME,
    Item: {
        date: currentWeather.headers.date,
        city: currentWeather.data.name,
        temp: currentWeather.data.main.temp,
        feelsLike: currentWeather.data.main.feels_like,
        description: currentWeather.data.weather[0].description
     }
  };

console.log('jas sum promise i sum OK');


function createPost() {
    return new Promise((resolve, reject) => {
              
            dynamoDb.put(params, (error) => {
                // handle potential errors
                if (error) {
                  console.log(error);
                  console.error(error);
                  return;
                }
              });
    
            const error = false;
    
            if (!error) {
                resolve();
            } else {
                reject('Error: Something went wrong');
            }

       console.log('uspesen promise');
    });
    }


 createPost().catch(err => console.log(err));

  

  // create a resonse
  const response = {
    statusCode: 200,
    body: JSON.stringify({ SYSTEM: "Message sent to SNS" }),
  };
  callback(null, response);
}

const promise1 = promiseOne(0);

const promise2 = promiseOne(1);
const promise3 = promiseOne(2);


Promise.all([promise1, promise2, promise3]);



};