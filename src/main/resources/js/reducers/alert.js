export const alertMessage = (state={status: false}, action) => {
    switch (action.type) {
        case "GET_ALERT_MESSAGE":
            return {
                message: action.message,
                status: action.status,
                classes: action.classes
            };
        case "REMOVE_ALERT_MESSAGE":
            return {
                status: action.status
            };
        default:
            return state;
    }
};