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

export const createMeeting = async (
    title: string,
    description: string,
    place_id: number,
    time: string
) => {
    try {
        const response = await sendPostRequest<{ success: boolean }>("/api/meeting", {
            title,
            description,
            place_id,
            time,
        });
    } catch (e) {
        console.log(e);
    }
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
