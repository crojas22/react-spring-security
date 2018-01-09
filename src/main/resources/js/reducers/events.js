export const userEvents = (state=[], action) => {
    switch (action.type) {
        case "USER_EVENTS":
            return action.payload;
        default:
            return state
    }
};