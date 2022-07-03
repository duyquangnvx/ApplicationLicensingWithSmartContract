const ResponseUtil = (() => {

    return {
        MESSAGE_SUCCESS: 0,
        MESSAGE_ERROR: 1,

        createMessage: (error, data) => {
            const message = {
                error: error,
                data: data
            };
            return message
        },
        handleError: (res, error) => {
            console.log('handleError', error);
            const message = ResponseUtil.createMessage(ResponseUtil.MESSAGE_ERROR, {
                error: error
            });
            res.send(message);
        },
    }
})();

module.exports = ResponseUtil;