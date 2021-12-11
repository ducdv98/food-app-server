const testAdmin = async (req, res) => {
    try {
        res.status(201).send([]);
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports = {
    testAdmin,
};
