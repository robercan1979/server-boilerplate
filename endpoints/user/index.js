const user = {
    get: async (req, res) => {
        const {data} = await axios.get('', req)
        console.log('Data: %o', data)
        res.send(data)
    },
    post: () => {

    },
    put: () => {
        
    },
    delete: () => {

    }
}

module.exports = user