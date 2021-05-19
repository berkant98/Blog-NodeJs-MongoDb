const isEmpty = (obj) => {
    return obj === null || obj === undefined || Object.keys(obj).length === 0;
};

module.exports = isEmpty;