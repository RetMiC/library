const getAllBooks = async (req, res) => {
    const { knex } = req.app.locals
    await knex.select('*')
        .from('genre')
        .then(data => {
            return res.status(200).json({ data })
        })
        .catch(error => res.status(500).json({ error }))
}

const addNewBook = async (req, res) => {
    const { knex } = req.app.locals
    const payload = req.body

    if (!payload.title || !payload.genre || !payload.author || !payload.publisher || !payload.text) {
        return res.status(400).json({ error: "Пожалуйста, заполните все необходимые поля" })
    }

    try {

        var errors = new Object();
        
        const genreExists = await knex('genre').where({ id: payload.genre }).first()
        if (!genreExists) {
            errors.genre = "Жанр не найден. Пожалуйста, укажите правильный id"
        }

        const authorExists = await knex('author').where({ id: payload.author }).first()
        if (!authorExists) {
            errors.author = "Автор не найден. Пожалуйста, укажите правильный id"
        }

        
        const publisherExists = await knex('publisher').where({ id: payload.publisher }).first()
        if (!publisherExists) {
            errors.publisher = "Издатель не найден. Пожалуйста, укажите правильный id"
        }

        if (Object.keys(errors).length !== 0) {
            return res.status(404).json({ errors: errors })
        }

        const [data] = await knex('books').insert({
            title: payload.title,
            genre: payload.genre,
            author: payload.author,
            publisher: payload.publisher,
            text: payload.text
        })

        return res.status(201).json({ book: data })

        // return res.status(200).json({ data })

    } catch (error) {
        return res.status(500).json({ error: error.message || "Внутренняя ошибка сервера" })
    }
}



const getBookById = async (req, res) => {
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

const updateBook = async (req, res) => {
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

const deleteBook = async (req, res) => {
    const { knex } = req.app.locals
    const payload = req.body
    // console.log(payload.name)

    if (!payload.id) {
        return res.status(404).json("Пожалуйста, укажите id жанра")
    }

    await knex('genre')
        .where({ id: payload.id })
        .del()
        .then(data => {
            if (data === 0) {
                return res.status(200).json({ error: "Жанр не найден" })
            }
            return res.status(200).json({ data: "Жанр удален" })
        })
        .catch(error => res.status(500).json({ error }))
}


module.exports = {
    getAllBooks,
    getBookById,
    addNewBook,
    updateBook,
    deleteBook,
}