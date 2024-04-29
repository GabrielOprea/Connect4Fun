const ACTIVITIES_URL = "http://django-service:8000/public/api/activities/"

const addActivity = async (activity) => {
    try {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "UserID_id": activity.userID,
                "ActivityName": activity.activityName,
                "Description": activity.description,
                "Category": activity.category
            }),
        };

        const response = await fetch(ACTIVITIES_URL + "add/", options);
        const responseJson = await response.json();

        const data = JSON.parse(JSON.stringify(responseJson));
        return data;
    } catch (e) {
        console.log(e);
    }
};

const updateActivity = async (activity) => {
    try {
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "UserID_id": activity.userID,
                "ActivityName": activity.activityName,
                "Description": activity.description,
                "Category": activity.category
            }),
        };

        const response = await fetch(ACTIVITIES_URL + "update/" + activity.id + "/", options);
        const responseJson = await response.json();

        const data = JSON.parse(JSON.stringify(responseJson));
        return data;
    } catch (e) {
        console.log(e);
    }
};

const deleteActivity = async (id) => {
    try {
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id}),
        };

        const response = await fetch(ACTIVITIES_URL + "delete/" + id + "/", options);
        const responseJson = await response.json();

        const data = JSON.parse(JSON.stringify(responseJson));
        return data;
    } catch (e) {
        console.log(e);
    }
};

const getActivityById = async (id) => {
    try {

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(ACTIVITIES_URL + id + "/", options);
        const responseJson = await response.json();

        const data = JSON.parse(JSON.stringify(responseJson));
        return data;
    } catch (e) {
        console.log(e);
    }
};

const getAllActivities = async () => {
    try {

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(ACTIVITIES_URL, options);
        const responseJson = await response.json();

        const data = JSON.parse(JSON.stringify(responseJson));
        return data;
    } catch (e) {
        console.log(e);
    }
};

export const ActivityService = {
    addActivity,
    updateActivity,
    deleteActivity,
    getActivityById,
    getAllActivities,
};