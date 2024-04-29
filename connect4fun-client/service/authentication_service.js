import {UserService} from "./user_service";

const AUTH_URL = "http://django-service:8000/public/api/users/"

const loginUser = async (username, password) => {
    try {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "Username": username,
                "Password": password
            }),
        };

        const response = await fetch(AUTH_URL + "login/", options);

        if (response.status == "200") {
            const responseJson = await response.json();
            const data = JSON.parse(JSON.stringify(responseJson));

            sessionStorage.setItem("userID", data[0].pk);
            //sessionStorage.setItem("user", data[0].fields);

        } else {
            console.log("Invalid Login");

        }
    } catch (e) {
        console.log(e);
    }
};

const registerUser = async (user) => {
    const data = await UserService.addUser(user);
}
const logoutUser = () => {
    sessionStorage.removeItem("userID");
    //sessionStorage.removeItem("user");
}

const isLogged = () => {
    if (typeof sessionStorage !== 'undefined') {
        return (sessionStorage.getItem("userID") !== null);
    }
    return false;
}

const getUserID = () => {
    if (typeof sessionStorage !== 'undefined') {
        return sessionStorage.getItem("userID");
    }
}

export const AuthenticationService = {
    loginUser,
    registerUser,
    logoutUser,
    isLogged,
    getUserID
}