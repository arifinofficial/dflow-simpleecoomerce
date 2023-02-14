const defaultResponse = (success, message, data = null) => {
    return {
        isSuccess: success,
        message: message,
        data: data
    };
}

module.exports = defaultResponse;