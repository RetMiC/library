const getAllBooks = async (req, res) => {
    const { knex } = req.app.locals
    await knex.select('*')
        .from('books')
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
            year: payload.year,
            publisher: payload.publisher,
            value: payload.value,
            annotation: payload.annotation,
            text: payload.text
        })

        return res.status(201).json({ book: data })


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

    await knex('books')
        .where({
            id: id,
        })
        .then(data => {
            if (data.length === 0) {
                return res.status(200).json({ error: "Книга не найдена" })
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

        const data = await knex('books')
        .where({ id: id })
        .update({
            title: payload.title,
            genre: payload.genre,
            author: payload.author,
            year: payload.year,
            publisher: payload.publisher,
            value: payload.value,
            annotation: payload.annotation,
            text: payload.text
        })

        return res.status(201).json({ book: data })

    } catch (error) {
        return res.status(500).json({ error: error.message || "Внутренняя ошибка сервера" })
    }

}

const deleteBook = async (req, res) => {
    const { knex } = req.app.locals
    const payload = req.body

    if (!payload.id) {
        return res.status(404).json("Пожалуйста, укажите id книги")
    }

    await knex('books')
        .where({ id: payload.id })
        .del()
        .then(data => {
            if (data === 0) {
                return res.status(200).json({ error: "Книга не найдена" })
            }
            return res.status(200).json({ data: "Книга удалена" })
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