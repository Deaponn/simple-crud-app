import { LegalPlace, MeetingData } from "./model";

const sendGetRequest = async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${process.env.SERVER_URL}${endpoint}`);
    const result = await response.json();
    return result;
};

const sendPostRequest = async <T>(endpoint: string, body: object): Promise<T> => {
    const response = await fetch(`${process.env.SERVER_URL}${endpoint}`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(body),
    });
    const result = await response.json();
    return result;
};

export const getMeetings = async () => {
    return await sendGetRequest<{ success: boolean; meetings: MeetingData[] }>("/api/meeting");
};

export const createMeeting = async (
    title: string,
    description: string,
    place_id: number,
    time: string
): Promise<number> => {
    try {
        const response = await sendPostRequest<{ success: boolean; meeting_id: number }>(
            "/api/meeting",
            {
                title,
                description,
                place_id,
                time,
            }
        );
        return response.meeting_id;
    } catch (e) {
        console.log(e);
    }
    return -1;
};

export const getPlaces = async () => {
    return await sendGetRequest<{ success: boolean; places: LegalPlace[] }>("/api/place");
};

export const createPlace = async (name: string, country: string): Promise<number> => {
    try {
        const response = await sendPostRequest<{ success: boolean; place_id: number }>(
            "/api/place",
            {
                name,
                country,
            }
        );
        return response.place_id;
    } catch (e) {
        console.log(e);
    }
    return -1;
};
