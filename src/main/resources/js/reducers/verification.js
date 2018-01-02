export const userRegistered = (state = false, action) => {
    switch (action.type) {
        case 'REGISTRATION_SUCCESS':
            return action.registered;
        default:
            return state
    }
};

export const userAuthorized = (state=false, action) => {
    switch (action.type) {
        case "AUTHORIZED_USER":
            return action.authorized;
        default:
            return state
    }
};

export const userInfo = (state={}, action) => {
    switch (action.type) {
        case "USER_INFO":
            return action.payload.user;
        case "REMOVE_USER_INFO":
            return {};
        default:
            return state
    }
};