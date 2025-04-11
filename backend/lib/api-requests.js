const fetchForecast = async (place, country, datetime, apiKey) => {
    const result = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${place}, ${country}&days=3&aqi=yes&alerts=yes`
    );
    const { forecast } = await result.json();

    const {
        temp_c,
        feelslike_c,
        will_it_rain,
        chance_of_rain,
        wind_kph,
        pressure_mb,
        air_quality: { co, no2, pm2_5, pm10 },
    } = forecast.forecastday
        .filter(({ date }) => date === datetime.slice(0, 10))[0] // get forecast for the selected day
        .hour.filter(({ time }) => time.slice(11, 13) === datetime.slice(11, 13))[0]; // get forecast for the selected time

    return {
        temp_c,
        feelslike_c,
        will_it_rain,
        chance_of_rain,
        wind_kph,
        pressure_mb,
        co,
        no2,
        pm2_5,
        pm10,
    };
};

module.exports = {
    fetchForecast,
};
