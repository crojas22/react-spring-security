export const getMessageAction = (message, bool, classes) => {
    return {
        type: "GET_ALERT_MESSAGE",
        status: bool,
        message,
        classes
    }
};

export const removeMessageAction = bool => {
    return {
        type: "REMOVE_ALERT_MESSAGE",
        status: bool
    }
};