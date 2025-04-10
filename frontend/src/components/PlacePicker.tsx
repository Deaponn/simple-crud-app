import { useState } from "react";
import "./PlacePicker.css";

interface IPlacePicker {
    legalPlaces: {
        id: number;
        name: string;
        country: string;
    }[];
}

export default function PlacePicker({ legalPlaces }: IPlacePicker) {
    const countries = [...new Set(legalPlaces.map(({ country }) => country))];

    // TODO: handle empty country list
    const [selectedCountry, setSelectedCountry] = useState<string>(countries[0]);

    return (
        <div className="place-picker">
            <div className="country-select">
                <label htmlFor="country-select">Country</label>
                <select
                    id="country-select"
                    onChange={(e) => setSelectedCountry(e.currentTarget.value)}
                >
                    {countries.map((country) => (
                        <option value={country} key={country}>
                            {country}
                        </option>
                    ))}
                </select>
            </div>
            <div className="place-select">
                <label htmlFor="place-select">Place</label>
                <select id="place-select">
                    {legalPlaces
                        .filter(({ country }) => country === selectedCountry)
                        .map(({ id, name }) => (
                            <option value={id} key={id}>
                                {name}
                            </option>
                        ))}
                </select>
            </div>
        </div>
    );
}
