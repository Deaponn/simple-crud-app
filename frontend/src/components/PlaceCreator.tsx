import { useCallback, useState } from "react";
import "./PlaceCreator.css";
import { createPlace } from "../utils/network";

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

    const handlePlaceCreation = useCallback(() => {
        createPlace(placeName, countryName);
    }, [placeName, countryName]);

    const capitalize = useCallback((str: string) => str.charAt(0).toUpperCase() + str.slice(1), []);

    return (
        <div className="place-creator">
            <label htmlFor="new-country">Country name</label>
            <input
                type="text"
                placeholder="country..."
                value={countryName}
                onInput={(e) => setCountryName(capitalize(e.currentTarget.value))}
            />
            {countries.includes(countryName)
                ? "Creating place in existing country"
                : "Country will be created"}
            <label htmlFor="new-place">New place</label>
            <input
                type="text"
                placeholder="place..."
                value={placeName}
                onInput={(e) => setPlaceName(capitalize(e.currentTarget.value))}
            />
            {legalPlaces.filter(
                ({ name, country }) => placeName === name && country === countryName
            ).length > 0
                ? "This place already exists"
                : "Place will be created"}
            <input
                type="button"
                value="Create new place"
                disabled={
                    countryName.length < 3 ||
                    placeName.length < 3 ||
                    legalPlaces.filter(
                        ({ name, country }) => placeName === name && country === countryName
                    ).length > 0
                }
                onClick={handlePlaceCreation}
            />
        </div>
    );
}
