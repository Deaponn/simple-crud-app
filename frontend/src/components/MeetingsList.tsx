import { LegalPlace, MeetingData } from "../utils/model";
import Meeting from "./Meeting";
import "./MeetingsList.css";

interface IMeetingsList {
    meetings: MeetingData[];
    legalPlaces: LegalPlace[];
}

export default function MeetingsList({ meetings, legalPlaces }: IMeetingsList) {
    return (
        <div className="meetings-list">
            {meetings.map((data) => (
                <Meeting key={data.id} meeting={data} legalPlaces={legalPlaces} />
            ))}
        </div>
    );
}
