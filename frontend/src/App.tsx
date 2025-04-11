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

    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(5);
    const [pages, setPages] = useState(0);

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
        if (places.length == 0 || selectedCountry !== undefined || selectedPlaceId !== undefined)
            return;
        setSelectedCountry(places[0].country);
        setSelectedPlaceId(places[0].id);
    }, [places]);

    // TODO: add fetch query parameters
    const fetchMeetings = useCallback(async () => {
        const {
            meetings: newMeetings,
            page: newPage,
            perPage: newPerPage,
            pages: newPages,
        } = await getMeetings(page, perPage);
        setMeetings(newMeetings);
        setPage(newPage);
        setPerPage(newPerPage);
        setPages(newPages);
    }, [page, perPage]);

    const fetchPlaces = useCallback(async () => {
        const { places: newPlaces } = await getPlaces();
        setPlaces(newPlaces);
    }, []);

    const changeActiveTab = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setActiveTab(e.currentTarget.value);
    }, []);

    useEffect(() => {
        fetchMeetings();
    }, [page, perPage]);

    useEffect(() => {
        fetchPlaces();
    }, []);

    return (
        <>
            <h1>Simple CRUD App</h1>

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
                    fetchMeetings={fetchMeetings}
                />
            ) : null}
            {activeTab === "place-creator" ? (
                <PlaceCreator legalPlaces={places} refreshPlaces={fetchPlaces} />
            ) : null}
            {activeTab === "meetings-list" ? (
                <MeetingsList
                    meetings={meetings}
                    legalPlaces={places}
                    page={page}
                    perPage={perPage}
                    pages={pages}
                    setPage={setPage}
                    setPerPage={setPerPage}
                    fetchMeetings={fetchMeetings}
                />
            ) : null}
        </>
    );
}
