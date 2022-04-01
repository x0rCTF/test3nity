"use strict";

const AWS = require("aws-sdk");
const axios = require("axios");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.prilep = async (event, context, callback) => {
  const openWeatherMapAPIURL =
    "http://api.openweathermap.org/data/2.5/weather?id=786735&appid=15ea876c6db456422c681b5ba377ec0a&units=metric";
  const currentWeather = await axios
    .get(openWeatherMapAPIURL)
    .catch((error) => {
      console.log(error);
      return;
    });

  const params = {
    TableName: process.env.DYNAMODB_TABLE_NAME,
    Item: {
      date: currentWeather.headers.date,
      city: currentWeather.data.name,
      temp: currentWeather.data.main.temp,
      feelsLike: currentWeather.data.main.feels_like,
      description: currentWeather.data.weather[0].description,
    },
  };

  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.log(error);
      console.error(error);
      return;
    }
  });

  // create a resonse
  const response = {
    statusCode: 200,
    body: JSON.stringify({ SYSTEM: "Message sent to SNS" }),
  };
  callback(null, response);
};
