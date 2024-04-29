const MESSAGES_URL = "http://django-service:8000/public/api/messages/"

const addMessage = async (message) => {
    try {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "ConversationID_id": message.conversationID,
                "Content": message.content,
                "Timestamp": message.timestamp,
                "Status": message.status
            }),
        };

        const response = await fetch(MESSAGES_URL + "add/", options);
        const responseJson = await response.json();

        const data = JSON.parse(JSON.stringify(responseJson));
        return data;
    } catch (e) {
        console.log(e);
    }
};

const updateMessage = async (message) => {
    try {
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "ConversationID_id": message.conversationID,
                "Content": message.content,
                "Timestamp": message.timestamp,
                "Status": message.status
            }),
        };

        const response = await fetch(MESSAGES_URL + "update/" + message.id + "/", options);
        const responseJson = await response.json();

        const data = JSON.parse(JSON.stringify(responseJson));
        return data;
    } catch (e) {
        console.log(e);
    }
};

const deleteMessage = async (id) => {
    try {
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id}),
        };

        const response = await fetch(MESSAGES_URL + "delete/" + id + "/", options);
        const responseJson = await response.json();

        const data = JSON.parse(JSON.stringify(responseJson));
        return data;
    } catch (e) {
        console.log(e);
    }
};

const getMessageById = async (id) => {
    try {

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(MESSAGES_URL + id + "/", options);
        const responseJson = await response.json();

        const data = JSON.parse(JSON.stringify(responseJson));
        return data;
    } catch (e) {
        console.log(e);
    }
};

const getAllMessages = async () => {
    try {

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(MESSAGES_URL, options);
        const responseJson = await response.json();

        const data = JSON.parse(JSON.stringify(responseJson));
        return data;
    } catch (e) {
        console.log(e);
    }
};

export const MessageService = {
    addMessage,
    updateMessage,
    deleteMessage,
    getMessageById,
    getAllMessages,
};