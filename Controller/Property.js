const Properties = require("../Repository/Property");


//created a sucess message
exports.CreateAPI = async (req, res) => {
    try {
        await Properties.create(req.body);
        res.status(200).send("created sucessfulley")
    } catch (error) {
        throw error
    }
}

//get the Properties by some datas or propereties
exports.AllUser = async (req, res) => {
    try {
        let persons = await Properties.getall();
        console.log(persons);
        return res.status(200).send(persons);
    } catch (error) {
        throw error
    }
}

//delete the Propertiess
exports.Deleted = async (req, res) => {
    const delete_Properties = await Properties.deleting(req.params.id);
    res.status(200).send("sucessfulley deleted");
}

//updating the Propertiess list:
exports.Updated = async (req, res) => {
    let id = req.params.id;
    const update_Properties = await Properties.Updating({ _id: id }, req.body);
    console.log(update_Properties);
    res.status(200).send(update_Properties);
}


