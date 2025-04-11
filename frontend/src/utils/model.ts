export type LegalPlace = {
    id: number;
    name: string;
    country: string;
};

export type MeetingData = {
    id: number;
    title: string;
    description: string;
    time: string;
    name: string;
    country_name: string;
    temperature: string;
    temperature_feelslike: string;
    will_rain: boolean;
    rain_chance: string;
    wind_speed: string;
    pressure: string;
    aq_co: string;
    aq_no2: string;
    aq_pm2_5: string;
    aq_pm10: string;
};
