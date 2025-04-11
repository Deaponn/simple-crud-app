import { useCallback, useEffect, useState } from "react";
import "./App.css";
import MeetingCreator from "./components/MeetingCreator";
import PlaceCreator from "./components/PlaceCreator";
import { getMeetings, getPlaces } from "./utils/network.ts";
import { LegalPlace, MeetingData } from "./utils/model.ts";
import MeetingsList from "./components/MeetingsList.tsx";

export function App() {
    const [activeTab, setActiveTab] = useState<string>("meetings-list");
    const [places, setPlaces] = useState<LegalPlace[]>([]);
    const [meetings, setMeetings] = useState<MeetingData[]>([]);

    // TODO: move this to separate customHook
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [time, setTime] = useState<string>(new Date().toISOString().slice(0, 16));

    // undefined when no countries exist
    const [selectedCountry, setSelectedCountry] = useState<string | undefined>(
        places.length > 0 ? places[0].country : undefined
    );
    const [selectedPlaceId, setSelectedPlaceId] = useState<number | undefined>(
        places.length > 0 ? places[0].id : undefined
    );

    useEffect(() => {
        if (
            places.length == 0 ||
            selectedCountry !== undefined ||
            selectedPlaceId !== undefined
        )
            return;
        setSelectedCountry(places[0].country);
        setSelectedPlaceId(places[0].id);
    }, [places]);

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

            {activeTab === "meeting-creator" ? (
                <MeetingCreator
                    legalPlaces={places}
                    selectedCountry={selectedCountry}
                    selectedPlaceId={selectedPlaceId}
                    title={title}
                    description={description}
                    time={time}
                    setSelectedCountry={setSelectedCountry}
                    setSelectedPlaceId={setSelectedPlaceId}
                    setTitle={setTitle}
                    setDescription={setDescription}
                    setTime={setTime}
                />
            ) : null}
            {activeTab === "place-creator" ? (
                <PlaceCreator legalPlaces={places} refreshPlaces={fetchPlaces} />
            ) : null}
            {activeTab === "meetings-list" ? (
                <MeetingsList meetings={meetings} legalPlaces={places} />
            ) : null}
        </>
    );
}
