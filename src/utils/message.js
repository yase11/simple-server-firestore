
const createMessage = (isError=false, message='') => ({ error: isError, message });

module.exports = createMessage;