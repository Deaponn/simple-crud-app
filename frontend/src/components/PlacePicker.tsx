import { LegalPlace } from "../utils/model";
import "./PlacePicker.css";

interface IPlacePicker {
    legalPlaces: LegalPlace[];
    selectedCountry: string | undefined; // undefined when there are no places created yet
    setSelectedCountry: React.Dispatch<React.SetStateAction<string | undefined>>;
    selectedPlaceId: number | undefined;
    setSelectedPlaceId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export default function PlacePicker({
    legalPlaces,
    selectedCountry,
    setSelectedCountry,
    selectedPlaceId,
    setSelectedPlaceId,
}: IPlacePicker) {
    const countries = [...new Set(legalPlaces.map(({ country }) => country))];

    return (
        <div className="place-picker">
            <div className="country-select">
                <label htmlFor="country-select">Country</label>
                <select
                    id="country-select"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.currentTarget.value)}
                >
                    {selectedCountry ? (
                        countries.map((country) => (
                            <option value={country} key={country}>
                                {country}
                            </option>
                        ))
                    ) : (
                        <option>{"<no countries exist>"}</option>
                    )}
                </select>
            </div>
            <div className="place-select">
                <label htmlFor="place-select">
                    Place
                </label>
                <select
                    id="place-select"
                    value={selectedPlaceId}
                    onChange={(e) => setSelectedPlaceId(Number(e.currentTarget.value))}
                >
                    {selectedCountry != undefined && selectedPlaceId != undefined ? (
                        legalPlaces
                            .filter(({ country }) => country === selectedCountry)
                            .map(({ id, name }) => (
                                <option value={id} key={id}>
                                    {name}
                                </option>
                            ))
                    ) : (
                        <option>{"<no country selected>"}</option>
                    )}
                </select>
            </div>
        </div>
    );
}
