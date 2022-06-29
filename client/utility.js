const utility = (() => {

    return {
        createResponse: (status, error, data) => {
            const response = {
                status: status,
                error: error,
                data: data
            };
            return response
        }
    }
})();

module.exports = utility;