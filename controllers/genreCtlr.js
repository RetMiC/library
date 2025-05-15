const getAllGenre = async (req, res) => {
    const { knex } = req.app.locals
    await knex.select('*')
        .from('genre')
        .then(data => {
            return res.status(200).json({ data })
        })
        .catch(error => res.status(500).json({ error }))
}

const addNewGenre = async (req, res) => {
    const { knex } = req.app.locals
    const payload = req.body

    console.log(payload.name.length)

    if (!payload.name) {
        return res.status(404).json("Пожалуйста, укажите жанр")
    }

    if (payload.name.length < 2) {
        return res.status(404).json({ error: "Название жанра не должно быть меньше 2 символов" })
    }

    if (payload.name.length > 100) {
        return res.status(404).json({ error: "Название жанра не должно превышать 100 символов" })
    }

    await knex('genre')
        .insert({ name: payload.name })
        .then(data => {
            return res.status(200).json({ data })
        })
        .catch(error => res.status(500).json({ error }))
}


const getGenreById = async (req, res) => {
    const { knex } = req.app.locals
    const { id } = req.params
    if (!id) {
        return res.status(404).json("Пожалуйста, укажите id жанра")
    }

    await knex('genre')
        .where({
            id: id,
        })
        .then(data => {
            if (data.length === 0) {
                return res.status(200).json({ error: "Жанр не найден" })
            }
            return res.status(200).json({ data })
        })
        .catch(error => {
            return res.status(500).json({ error })
        }
        )
}

const updateGenre = async (req, res) => {
    const { knex } = req.app.locals
    const payload = req.body
    const { id } = req.params

    // console.log(payload.name)

    if (!payload.name) {
        return res.status(404).json("Пожалуйста, укажите жанр")
    }

    if (payload.name.length < 2) {
        return res.status(404).json({ error: "Название жанра не должно быть меньше 2 символов" })
    }

    if (payload.name.length > 100) {
        return res.status(404).json({ error: "Название жанра не должно превышать 100 символов" })
    }

    await knex('genre')
        .where({ id: id })
        .update({ name: payload.name })
        .then(data => {
            return res.status(200).json({ data })
        })
        .catch(error => res.status(500).json({ error }))
}

const deleteGenre = async (req, res) => {
    const { knex } = req.app.locals
    const payload = req.body
    // console.log(payload.name)

    if (!payload.id) {
        return res.status(404).json("Пожалуйста, укажите id жанра")
    }

    const genre = await knex('genre')
        .where({
            id: payload.id,
        })

    if (genre.length === 0) {
        return res.status(200).json({ error: "Жанр не найден" })
    }

    await knex('genre')
        .where({ id: payload.id })
        .del()
        .then(data => {
            return res.status(200).json({ data: `Жанр '${genre[0].name}' удален` })
        })
        .catch(error => res.status(500).json({ error }))
}


module.exports = {
    getAllGenre,
    addNewGenre,
    getGenreById,
    updateGenre,
    deleteGenre
}