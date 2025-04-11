import { MeetingData } from "../utils/model";

export default function Meeting({
    id,
    title,
    description,
    time,
    name,
    country_name,
    temperature,
    temperature_feelslike,
    will_rain,
    rain_chance,
    wind_speed,
    pressure,
    aq_co,
    aq_no2,
    aq_pm2_5,
    aq_pm10,
}: MeetingData) {
    return (
        <div className="meeting">
            <div className="main-info">
                {title} {name}, {country_name}
            </div>
            <div className="detailed-info">
                <p>{description}</p>
                <em>Will take place @ {time.replace("T", " ")}</em>
                <p>
                    The temperature will be {temperature}℃, but it will feel like{" "}
                    {temperature_feelslike}℃
                </p>
                <p>
                    It will{will_rain ? "" : " not"} rain with{" "}
                    {will_rain ? rain_chance : 100 - Number(rain_chance)}% chance
                </p>
                <p>
                    Wind will have speed of {wind_speed} kph and the pressure will be {pressure}
                </p>
                <details>
                    <summary>Air quality summary</summary>
                    <ul>
                        {/* TODO: consider list-style-type: none */}
                        <li>CO level: {aq_co}</li>
                        <li>NO2 level: {aq_no2}</li>
                        <li>PM2.5 level: {aq_pm2_5}</li>
                        <li>PM10 level: {aq_pm10}</li>
                    </ul>
                </details>
            </div>
        </div>
    );
}
