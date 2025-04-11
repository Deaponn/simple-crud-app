import { useCallback, useEffect, useState } from "react";
import "./App.css";
import MeetingCreator from "./components/MeetingCreator";
import PlaceCreator from "./components/PlaceCreator";
import { getMeetings, getPlaces } from "./utils/network.ts";
import { LegalPlace, MeetingData } from "./utils/model.ts";
import MeetingsList from "./components/MeetingsList.tsx";

export function App() {
    const [activeTab, setActiveTab] = useState<string>("meeting-creator");
    const [places, setPlaces] = useState<LegalPlace[]>([]);
    const [meetings, setMeetings] = useState<MeetingData[]>([]);

    // TODO: add fetch query parameters
    const fetchMeetings = useCallback(async () => {
        const { meetings: newMeetings } = await getMeetings();
        setMeetings(newMeetings);
    }, []);

    const fetchPlaces = useCallback(async () => {
        const { places: newPlaces } = await getPlaces();
        setPlaces(newPlaces);
    }, []);

    const changeActiveTab = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setActiveTab(e.currentTarget.value);
    }, []);

    useEffect(() => {
        fetchMeetings();
        fetchPlaces();
    }, []);

    return (
        <>
            <h1>Parcel React App</h1>

            {/* TODO: rework input value, checked, activeTab and dynamic rendering */}
            <label htmlFor="meeting-creator">Meeting creator</label>
            <input
                id="meeting-creator"
                value="meeting-creator"
                type="radio"
                checked={activeTab === "meeting-creator"}
                onChange={changeActiveTab}
            />

            <label htmlFor="place-creator">Place creator</label>
            <input
                id="place-creator"
                value="place-creator"
                type="radio"
                checked={activeTab === "place-creator"}
                onChange={changeActiveTab}
            />

            <label htmlFor="meetings-list">Meetings list</label>
            <input
                id="meetings-list"
                value="meetings-list"
                type="radio"
                checked={activeTab === "meetings-list"}
                onChange={changeActiveTab}
            />

            {activeTab === "meeting-creator" ? <MeetingCreator legalPlaces={places} /> : null}
            {activeTab === "place-creator" ? (
                <PlaceCreator legalPlaces={places} refreshPlaces={fetchPlaces} />
            ) : null}
            {activeTab === "meetings-list" ? <MeetingsList meetings={meetings} /> : null}
        </>
    );
}
