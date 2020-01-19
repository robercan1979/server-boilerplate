const imagen = ({ axios }) => ({
    get: async (req, res) => {
        const {data} = {}
        res.status(200).send(data)
    },
    post: async (req, res) => {
        const {body} = req;
            const {data} = {}
            res.status(201).send(data)
    },
    put: async(req, res) => {
        const { body } = req
        const { id } = req.params
        console.log("ID to update: " + id);
        const { data } = {}
        res.status(201).send(data)
    },
    delete: async(req, res) => {
        const { body } = req
        const { id } = req.params
        console.log("ID to delete: " + id);
        const { data } = {}
        res.status(201).send(data)
    }
})

module.exports = imagen