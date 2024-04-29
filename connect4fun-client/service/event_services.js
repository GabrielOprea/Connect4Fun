const EVENTS_URL = "http://django-service:8000/public/api/events/"

const addEvent = async (event) => {
    try {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "UserID_id": event.userID,
                "ActivityID+id": event.activityID,
                "Status": event.status,
                "Location": event.location,
                "Date": event.date,
                "Time": event.time,
                "CreationDate": event.creationDate
            }),
        };

        const response = await fetch(EVENTS_URL + "add/", options);
        const responseJson = await response.json();

        const data = JSON.parse(JSON.stringify(responseJson));
        return data;
    } catch (e) {
        console.log(e);
    }
};

const updateEvent = async (event) => {
    try {
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "UserID_id": event.userID,
                "ActivityID+id": event.activityID,
                "Status": event.status,
                "Location": event.location,
                "Date": event.date,
                "Time": event.time,
                "CreationDate": event.creationDate
            }),
        };

        const response = await fetch(EVENTS_URL + "update/" + event.id + "/", options);
        const responseJson = await response.json();

        const data = JSON.parse(JSON.stringify(responseJson));
        return data;
    } catch (e) {
        console.log(e);
    }
};

const deleteEvent = async (id) => {
    try {
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id}),
        };

        const response = await fetch(EVENTS_URL + "delete/" + id + "/", options);
        const responseJson = await response.json();

        const data = JSON.parse(JSON.stringify(responseJson));
        return data;
    } catch (e) {
        console.log(e);
    }
};

const getEventById = async (id) => {
    try {

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(EVENTS_URL + id + "/", options);
        const responseJson = await response.json();

        const data = JSON.parse(JSON.stringify(responseJson));
        return data;
    } catch (e) {
        console.log(e);
    }
};

const getAllEvents = async () => {
    try {

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(EVENTS_URL, options);
        const responseJson = await response.json();

        const data = JSON.parse(JSON.stringify(responseJson));
        return data;
    } catch (e) {
        console.log(e);
    }
};

export const EventService = {
    addEvent,
    updateEvent,
    deleteEvent,
    getEventById,
    getAllEvents,
};