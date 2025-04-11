import { useCallback } from "react";
import { LegalPlace, MeetingData } from "../utils/model";
import Meeting from "./Meeting";
import "./MeetingsList.css";

interface IMeetingsList {
    meetings: MeetingData[];
    legalPlaces: LegalPlace[];
    page: number;
    perPage: number;
    pages: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    setPerPage: React.Dispatch<React.SetStateAction<number>>;
    fetchMeetings: () => Promise<void>;
}

export default function MeetingsList({
    meetings,
    legalPlaces,
    page,
    perPage,
    pages,
    setPage,
    setPerPage,
    fetchMeetings,
}: IMeetingsList) {
    const handlePageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setPage(Number(e.currentTarget.value));
    }, []);

    const handlePerPageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPage(0);
        setPerPage(Number(e.currentTarget.value));
    }, []);

    return (
        <div className="meetings-list">
            {meetings.map((data) => (
                <Meeting
                    key={data.id}
                    meeting={data}
                    legalPlaces={legalPlaces}
                    fetchMeetings={fetchMeetings}
                />
            ))}
            <div>
                Page{" "}
                <select value={page} onChange={handlePageChange}>
                    {[...Array(pages).keys()].map((i) => (
                        <option value={i} key={i}>
                            {i + 1}
                        </option>
                    ))}
                </select>{" "}
                / {pages}. Showing{" "}
                <input type="number" value={perPage} onChange={handlePerPageChange} /> items.
            </div>
        </div>
    );
}
