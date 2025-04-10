import "./MeetingCreator.css";
import PlacePicker from "./PlacePicker";

// TODO: move legalPlaces to common file with PlacePicker
interface IMeetingCreator {
    legalPlaces: {
        id: number;
        name: string;
        country: string;
    }[];
}

export default function MeetingCreator({ legalPlaces }: IMeetingCreator) {
    return (
        <div className="meeting-creator">
            <label htmlFor="title">Meeting title</label>
            <input id="title" type="text" placeholder="title..." />
            <label htmlFor="description">Description</label>
            <textarea id="description" placeholder="description..."></textarea>
            <label htmlFor="time">Time of meeting</label>
            <input id="time" type="datetime-local" />
            <PlacePicker legalPlaces={legalPlaces} />
        </div>
    );
}
