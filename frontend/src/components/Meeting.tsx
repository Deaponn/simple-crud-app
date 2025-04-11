import { useCallback, useEffect, useState } from "react";
import { LegalPlace, MeetingData } from "../utils/model";
import "./Meeting.css";
import MeetingCreator from "./MeetingCreator";
import { deleteMeeting, patchMeeting } from "../utils/network";

interface IMeeting {
    meeting: MeetingData;
    legalPlaces: LegalPlace[];
    fetchMeetings: () => Promise<void>;
}

export default function Meeting({
    meeting: {
        id,
        title: mTitle,
        description: mDescription,
        time: mTime,
        name,
        place_id: placeId,
        country_name,
        temperature,
        temperature_feelslike,
        will_rain,
        rain_chance,
        wind_speed,
        pressure,
        aq_co,
        aq_no2,
        aq_pm2_5,
        aq_pm10,
    },
    legalPlaces,
    fetchMeetings,
}: IMeeting) {
    const [isEditing, setIsEditing] = useState(false);

    const [title, setTitle] = useState<string>(mTitle);
    const [description, setDescription] = useState<string>(mDescription);
    const [time, setTime] = useState<string>(mTime.slice(0, 16));

    // undefined when no countries exist
    const [selectedCountry, setSelectedCountry] = useState<string | undefined>(country_name);
    const [selectedPlaceId, setSelectedPlaceId] = useState<number | undefined>(Number(placeId));

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

    const handleToggleEditing = useCallback(async () => {
        if (isEditing) {
            await patchMeeting(id, title, description, selectedPlaceId!, time);
            fetchMeetings();
        }
        setIsEditing((oldEditing) => !oldEditing);
    }, [isEditing, title, description, selectedPlaceId!, time]);

    const handleDelete = useCallback(async () => {
        await deleteMeeting(id);
        fetchMeetings();
    }, []);

    return (
        <div className="meeting">
            <div className="edit-button" onClick={handleToggleEditing}>
                {isEditing ? "Save" : "Edit"}
            </div>
            <div className="delete-button" onClick={handleDelete}>
                Del
            </div>
            {!isEditing ? (
                <>
                    <div className="main-info">
                        <h2>{title}</h2>
                        <h3>
                            {name}, {country_name}
                        </h3>
                    </div>
                    <div className="detailed-info">
                        <p>{description}</p>
                        <em>Will take place @ {time.replace("T", " ")}</em>
                        <details>
                            <summary>Weather summary</summary>
                            <p>
                                The temperature will be {temperature}℃, but it will feel like{" "}
                                {temperature_feelslike}℃
                            </p>
                            <p>
                                It will{will_rain ? "" : " not"} rain with{" "}
                                {will_rain ? rain_chance : 100 - Number(rain_chance)}% chance
                            </p>
                            <p>
                                Wind will have speed of {wind_speed} kph and the pressure will be{" "}
                                {pressure}
                            </p>
                        </details>
                        <details>
                            <summary>Air quality summary</summary>
                            <ul>
                                {/* TODO: consider list-style-type: none */}
                                <li>CO level: {aq_co}</li>
                                <li>NO2 level: {aq_no2}</li>
                                <li>PM2.5 level: {aq_pm2_5}</li>
                                <li>PM10 level: {aq_pm10}</li>
                            </ul>
                        </details>
                    </div>
                </>
            ) : (
                <MeetingCreator
                    legalPlaces={legalPlaces}
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
                    hideButton={true}
                />
            )}
        </div>
    );
}
