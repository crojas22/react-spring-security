export const userRegistered = (state = false, action) => {
    switch (action.type) {
        case 'REGISTRATION_SUCCESS':
            return action.registered;
        default:
            return state
    }
};