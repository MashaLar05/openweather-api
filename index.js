import axios from 'axios';
import chalk from 'chalk';

const apiKey = 'ca571f641ec224dcc7237aa66a68a689';
const city = 'Taglag';
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

axios.get(url)
    .then(response => {
        const data = response.data;
        console.log(chalk.blue('Weather Data for ' + data.name + ', ' + data.sys.country));
        console.log(chalk.green('Temperature: ') + (data.main.temp - 273.15).toFixed(2) + '°C');
        console.log(chalk.green('Weather: ') + data.weather[0].description);
        console.log(chalk.green('Humidity: ') + data.main.humidity + '%');
        console.log(chalk.green('Wind Speed: ') + data.wind.speed + ' m/s');
    })
    .catch(error => {
        console.error(chalk.red('Error fetching data from OpenWeather API:'), error);
    });
