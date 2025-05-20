const getAllPublisher = async (req, res) => {
    const { knex } = req.app.locals
    await knex.select('*')
        .from('publisher')
        .then(data => {
            return res.status(200).json({ data })
        })
        .catch(error => res.status(500).json({ error }))
}

const addNewPublisher = async (req, res) => {
    const { knex } = req.app.locals
    const payload = req.body

    if (!payload.publisher) {
        return res.status(404).json("Пожалуйста, укажите издателя")
    }

    if (payload.publisher.length < 2) {
        return res.status(404).json({ error: "Название издателя не должно быть меньше 2 символов"})
    }

    if (payload.publisher.length > 100) {
        return res.status(404).json({ error: "Название издателя не должно превышать 100 символов"})
    }

    await knex('publisher')
        .insert({ publisher: payload.publisher })
        .then(data => {
            return res.status(200).json({ data })
        })
        .catch(error => res.status(500).json({ error }))
}


const getPublisherById = async (req, res) => {
    const { knex } = req.app.locals
    const { id } = req.params
    if (!id) {
        return res.status(404).json("Пожалуйста, укажите id издателя")
    }

    await knex('publisher')
        .where({
            id: id,
        })
        .then(data => {
            if (data.length === 0) {
                return res.status(200).json({ error: "Издатель не найден" })
            }
            return res.status(200).json({ data })
        })
        .catch(error => { 
            return res.status(500).json({ error })
        }
    )
}

const updatePublisher = async (req, res) => {
    const { knex } = req.app.locals
    const payload = req.body
    const { id } = req.params

    if (!payload.publisher) {
        return res.status(404).json("Пожалуйста, укажите издателя")
    }

    if (payload.publisher.length < 2) {
        return res.status(404).json({ error: "Название издателя не должно быть меньше 2 символов"})
    }

    if (payload.publisher.length > 100) {
        return res.status(404).json({ error: "Название издателя не должно превышать 100 символов"})
    }

    await knex('publisher')
        .where({ id: id })
        .update({ publisher: payload.publisher })
        .then(data => {
            return res.status(200).json({ data })
        })
        .catch(error => res.status(500).json({ error }))
}

const deletePublisher = async (req, res) => {
    const { knex } = req.app.locals
    const payload = req.body

    if (!payload.id) {
        return res.status(404).json("Пожалуйста, укажите id издателя")
    }

    await knex('publisher')
        .where({ id: payload.id })
        .del()
        .then(data => {
            if (data === 0) {
                return res.status(200).json({ error: "Издатель не найден" })
            }
            return res.status(200).json({ data: "Издатель удален" })
        })
        .catch(error => res.status(500).json({ error }))
}


module.exports = {
    getAllPublisher,
    addNewPublisher,
    getPublisherById,
    updatePublisher,
    deletePublisher
}