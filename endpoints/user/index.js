const user = ({ axios }) => ({
    get: async (req, res) => {
        const {data} = await axios.get('https://jsonplaceholder.typicode.com/posts', {})
        console.log('Data: %o', data)
        res.status(200).send(data)
    },
    post: async (req, res) => {
        const {body} = req;
            const {data} = await axios.post('https://jsonplaceholder.typicode.com/posts', body)
            console.log('Data: %o', data)
            res.status(201).send(data)
    },
    put: async(req, res) => {
        const { body } = req
        const { id } = req.params
        console.log("ID to update: " + id);
        const { data } = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, body).catch((error) => {
            console.log("Error %o", error)
        })
        res.status(201).send(data)
    },
    delete: async(req, res) => {
        const { body } = req
        const { id } = req.params
        console.log("ID to delete: " + id);
        const { data } = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`, body).catch((error) => {
            console.log("Error %o", error)
        })
        res.status(201).send(data)
    }
})

module.exports = user