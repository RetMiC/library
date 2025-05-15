const getAllauthors = async (req, res) => {
    const { knex } = req.app.locals
    await knex.select('*')
        .from('author')
        .then(data => {
            return res.status(200).json({ data })
        })
        .catch(error => res.status(500).json({ error }))
}

const addNewAuthors = async (req, res) => {
    const { knex } = req.app.locals
    const payload = req.body
    // console.log(payload.name)

    if (!payload.name) {
        return res.status(404).json("Пожалуйста, укажите автора")
    }

    await knex('author')
        .insert({ name: payload.name })
        .then(data => {
            return res.status(200).json({ data })
        })
        .catch(error => res.status(500).json({ error }))
}


const getAuthorById = async (req, res) => {
    const { knex } = req.app.locals
    const { id } = req.params

    // console.log("id", id);

    await knex('author')
        .where({
            id: id,
        })
        .then(data => {
            return res.status(200).json({ data })
        })
        .catch(error => res.status(500).json({ error }))
}

const updateAuthor = async (req, res) => {
    const { knex } = req.app.locals
    const payload = req.body
    const { id } = req.params

    // console.log(payload.name)

    if (!payload.name) {
        return res.status(404).json("Пожалуйста, укажите автора")
    }

    await knex('author')
        .where({ id: id })
        .update({ name: payload.name })
        .then(data => {
            return res.status(200).json({ data })
        })
        .catch(error => res.status(500).json({ error }))
}

const deleteAuthor = async (req, res) => {
    const { knex } = req.app.locals
    const payload = req.body
    // console.log(payload.name)

    if (!payload.id) {
        return res.status(404).json("Пожалуйста, укажите id автора")
    }

    await knex('author')
        .where({ id: payload.id })
        .del()
        .then(data => {
            return res.status(200).json({ data })
        })
        .catch(error => res.status(500).json({ error }))
}


module.exports = {
    getAllauthors,
    addNewAuthors,
    getAuthorById,
    updateAuthor,
    deleteAuthor
}