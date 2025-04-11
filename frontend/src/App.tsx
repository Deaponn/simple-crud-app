import { useCallback, useEffect, useState } from "react";
import "./App.css";
import MeetingCreator from "./components/MeetingCreator";
import PlaceCreator from "./components/PlaceCreator";
import { getPlaces } from "./utils/network.ts";
import { LegalPlace } from "./utils/model.ts";

export function App() {
    const [activeCreator, setActiveCreator] = useState<string>("meeting-creator");
    const [places, setPlaces] = useState<LegalPlace[]>([]);

    const fetchPlaces = useCallback(async () => {
        const { places: newPlaces } = await getPlaces();
        setPlaces(newPlaces);
    }, []);

    useEffect(() => {
        fetchPlaces();
    }, []);

    return (
        <>
            <h1>Parcel React App</h1>

            {/* TODO: rework input value, checked, activeCreator and dynamic rendering */}
            <label htmlFor="meeting-creator">Meeting creator</label>
            <input
                id="meeting-creator"
                value="meeting-creator"
                type="radio"
                checked={activeCreator === "meeting-creator"}
                onChange={(e) => setActiveCreator(e.currentTarget.value)}
            />

            <label htmlFor="place-creator">Place creator</label>
            <input
                id="place-creator"
                value="place-creator"
                type="radio"
                checked={activeCreator === "place-creator"}
                onChange={(e) => setActiveCreator(e.currentTarget.value)}
            />

            {activeCreator === "meeting-creator" ? <MeetingCreator legalPlaces={places} /> : null}
            {activeCreator === "place-creator" ? (
                <PlaceCreator legalPlaces={places} refreshPlaces={fetchPlaces} />
            ) : null}
        </>
    );
}
