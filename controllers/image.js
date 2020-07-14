// @ts-nocheck
const handleImage = (req, res, db) => {
    const { id } = req.body;
    db("users")
    .where("id", '=', id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => res.json(Number(entries[0])))
    .catch(err => res.status(400).json("Unable to Get Entries Count"));
};

module.exports = {
    handleImage: handleImage
};