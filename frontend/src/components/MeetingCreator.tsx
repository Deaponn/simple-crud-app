import { useCallback, useEffect, useState } from "react";
import "./MeetingCreator.css";
import PlacePicker from "./PlacePicker";
import { createMeeting } from "../utils/network";
import { LegalPlace } from "../utils/model";

interface IMeetingCreator {
    legalPlaces: LegalPlace[];
}

export default function MeetingCreator({ legalPlaces }: IMeetingCreator) {
    const date = new Date();

    const today = date.toISOString().slice(0, 16);
    date.setDate(date.getDate() + 3);
    const inThreeDays = date.toISOString().slice(0, 16);

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [time, setTime] = useState<string>(today);

    // undefined when no countries exist
    const [selectedCountry, setSelectedCountry] = useState<string | undefined>(
        legalPlaces.length > 0 ? legalPlaces[0].country : undefined
    );
    const [selectedPlaceId, setSelectedPlaceId] = useState<number | undefined>(
        legalPlaces.length > 0 ? legalPlaces[0].id : undefined
    );

    useEffect(() => {
        if (
            legalPlaces.length == 0 ||
            selectedCountry !== undefined ||
            selectedPlaceId !== undefined
        )
            return;
        setSelectedCountry(legalPlaces[0].country);
        setSelectedPlaceId(legalPlaces[0].id);
    }, [legalPlaces]);

    const handleMeetingCreation = useCallback(() => {
        createMeeting(title, description, selectedPlaceId!, time);
    }, [title, description, selectedPlaceId, time]);

    return (
        <div className="meeting-creator">
            <label htmlFor="title">Meeting title</label>
            <input
                id="title"
                type="text"
                placeholder="title..."
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
            />
            <label htmlFor="description">Description</label>
            <textarea
                id="description"
                placeholder="description..."
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
            ></textarea>
            <label htmlFor="time">Time of meeting</label>
            <input
                id="time"
                type="datetime-local"
                min={today}
                max={inThreeDays}
                value={time}
                onChange={(e) => setTime(e.currentTarget.value)}
            />
            <PlacePicker
                legalPlaces={legalPlaces}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                selectedPlaceId={selectedPlaceId}
                setSelectedPlaceId={setSelectedPlaceId}
            />
            <input
                type="button"
                value="Create new meeting"
                disabled={
                    title.length < 3 ||
                    description.length < 3 ||
                    time.length < 3 ||
                    selectedPlaceId === undefined
                }
                onClick={handleMeetingCreation}
            />
        </div>
    );
}
