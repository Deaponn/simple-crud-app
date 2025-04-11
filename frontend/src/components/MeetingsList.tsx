import { MeetingData } from "../utils/model";
import Meeting from "./Meeting";

interface IMeetingsList {
    meetings: MeetingData[];
}

export default function MeetingsList({ meetings }: IMeetingsList) {
    return <div>{meetings.map((data) => <Meeting key={data.id} {...data} />)}</div>;
}
