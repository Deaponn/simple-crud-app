import { useCallback, useEffect, useState } from "react";
import "./MeetingCreator.css";
import PlacePicker from "./PlacePicker";
import { createMeeting } from "../utils/network";
import { LegalPlace } from "../utils/model";

interface IMeetingCreator {
    legalPlaces: LegalPlace[];
    selectedCountry: string | undefined;
    selectedPlaceId: number | undefined;
    title: string;
    description: string;
    time: string;
    setSelectedCountry: React.Dispatch<React.SetStateAction<string | undefined>>;
    setSelectedPlaceId: React.Dispatch<React.SetStateAction<number | undefined>>;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    setTime: React.Dispatch<React.SetStateAction<string>>;
    hideButton?: boolean;
}

export default function MeetingCreator({
    legalPlaces,
    selectedCountry,
    selectedPlaceId,
    title,
    description,
    time,
    setSelectedCountry,
    setSelectedPlaceId,
    setTitle,
    setDescription,
    setTime,
    hideButton,
}: IMeetingCreator) {
    const date = new Date();

    const today = date.toISOString().slice(0, 16);
    date.setDate(date.getDate() + 3);
    const inThreeDays = date.toISOString().slice(0, 16);

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
                selectedPlaceId={selectedPlaceId}
                setSelectedCountry={setSelectedCountry}
                setSelectedPlaceId={setSelectedPlaceId}
            />
            {hideButton ? null : (
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
            )}
        </div>
    );
}
