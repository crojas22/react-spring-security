export const userContacts = (state=[], action) => {
    switch (action.type) {
        case "USER_CONTACTS":
            return action.payload;
        default:
            return state
    }
};