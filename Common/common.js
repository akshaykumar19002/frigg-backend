const isNullorUndefined = (fridgeItemsFromDB) => {
    return fridgeItemsFromDB === undefined || fridgeItemsFromDB === null;
}

module.exports = {
    isNullorUndefined
}