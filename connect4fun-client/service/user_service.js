const USERS_URL = "http://django-service:8000/public/api/users/"

const addUser = async (user) => {
    try {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "Username": user.username,
                "FirstName": user.firstName,
                "LastName": user.lastName,
                "Role": user.role,
                "Email": user.email,
                "Password": user.password,
                "PhoneNumber": user.phoneNumber,
                "ProfilePicture": "",
                "Gender": user.gender,
                "Interests": user.interests.toString(),
                "Location": user.location,
                "Bio": "",
                "RegistrationDate": ""
            }),
        };

        const response = await fetch(USERS_URL + "add/", options);
        const result = await response.text();

        try {
            const data = JSON.parse(result);
            return data;
        } catch (e) {
            return result;
        }

    } catch (e) {
        console.log(e);
    }
};

const updateUser = async (user) => {
    try {
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "Username": user.username,
                "FirstName": user.firstName,
                "LastName": user.lastName,
                "Role": user.role,
                "Email": user.email,
                "Password": user.password,
                "PhoneNumber": user.phoneNumber,
                "ProfilePicture": user.profilePicture,
                "Gender": user.gender,
                "Interests": user.interests.toString(),
                "Location": user.location,
                "Bio": user.bio,
                "RegistrationDate": user.registrationDate
            }),
        };

        const response = await fetch(USERS_URL + "update/" + user.id + "/", options);
        const responseJson = await response.json();

        const data = JSON.parse(JSON.stringify(responseJson));
        return data;
    } catch (e) {
        console.log(e);
    }
};

const deleteUser = async (id) => {
    try {
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id}),
        };

        const response = await fetch(USERS_URL + "delete/" + id + "/", options);
        const responseJson = await response.json();

        const data = JSON.parse(JSON.stringify(responseJson));
        return data;
    } catch (e) {
        console.log(e);
    }
};

const getUserById = async (id) => {
    try {

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(USERS_URL + id + "/", options);
        const responseJson = await response.json();

        const data = JSON.parse(JSON.stringify(responseJson));

        return data;
    } catch (e) {
        console.log(e);
    }
};

const getAllUsers = async () => {
    try {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(USERS_URL, options);
        const responseJson = await response.json();

        const data = JSON.parse(JSON.stringify(responseJson));

        return data;
    } catch (e) {
        console.log(e);
    }
};

export const UserService = {
    addUser,
    updateUser,
    deleteUser,
    getUserById,
    getAllUsers,
};