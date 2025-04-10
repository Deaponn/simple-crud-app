import { useState } from "react";
import "./PlaceCreator.css";

// TODO: move legalPlaces to common file with PlacePicker
interface IPlaceCreator {
    legalPlaces: {
        id: number;
        name: string;
        country: string;
    }[];
}

export default function PlaceCreator({ legalPlaces }: IPlaceCreator) {
    const [countryName, setCountryName] = useState<string>("");
    const [placeName, setPlaceName] = useState<string>("");

    const countries = [...new Set(legalPlaces.map(({ country }) => country))];

    return (
        <div className="place-creator">
            <label htmlFor="new-country">Country name</label>
            <input
                type="text"
                placeholder="country..."
                onInput={(e) => setCountryName(e.currentTarget.value)}
            />
            {countries.includes(countryName)
                ? "Creating place in existing country"
                : "Country will be created"}
            <label htmlFor="new-place">New place</label>
            <input
                type="text"
                placeholder="place..."
                onInput={(e) => setPlaceName(e.currentTarget.value)}
            />
            {legalPlaces.filter(
                ({ name, country }) => placeName === name && country === countryName
            ).length > 0
                ? "This place already exists"
                : "Place will be created"}
        </div>
    );
}
