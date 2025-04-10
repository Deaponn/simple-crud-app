import { useState } from "react";
import "./App.css";
import MeetingCreator from "./components/MeetingCreator";
import PlaceCreator from "./components/PlaceCreator";

const places = [
    {
        id: 0,
        name: "Krakow",
        country: "Poland",
    },
    {
        id: 1,
        name: "Warsaw",
        country: "Poland",
    },
    {
        id: 2,
        name: "Wroclaw",
        country: "Poland",
    },
    {
        id: 3,
        name: "Bonn",
        country: "Germany",
    },
    {
        id: 4,
        name: "Berlin",
        country: "Germany",
    },
];

// const places: {id: number; name: string; country: string}[] = [];

export function App() {
    const [activeCreator, setActiveCreator] = useState<string>("meeting-creator");
    
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
            {activeCreator === "place-creator" ? <PlaceCreator legalPlaces={places} /> : null}
        </>
    );
}
