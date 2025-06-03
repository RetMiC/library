const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const { getUserByEmail, createUser } = require("../models/userModel");

// Регистрация пользователя
const registrationUser = async (req, res) => {
    const { knex } = req.app.locals
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({ message: "Пожалуйста, заполните все поля" });
    }

    try {
        // Проверяем, существует ли пользователь
        const userExists = await knex('users').where({ email: email }).first()
        if (userExists) {
            return res.status(404).json({ error: "Данный пользователь уже существует" })
        }

        // Хэшируем пароль
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создаём пользователя
        const [data] = await knex('users').insert({
            email: email,
            name: name,
            password: hashedPassword,
            role: "User"
        })

        return res.status(201).json({ user: data })

        // return res.status(200).json({ data })

    } catch (error) {
        return res.status(500).json({ error: error.message || "Внутренняя ошибка сервера" })
    }
};

// Вход пользователя
const loginUser = async (req, res) => {
    const { knex } = req.app.locals
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Пожалуйста, заполните все поля" });
    }

    try {
        // Проверяем, существует ли пользователь
        const userExists = await knex('users').where({ email: email }).first()
        if (!userExists) {
            return res.status(404).json({ error: "Неправильный логин или пароль" })
        }

        // Проверяем пароль
        const isMatch = await bcrypt.compare(password, userExists.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Неправильный логин или пароль" });
        }

        // Генерируем JWT с добавлением роли пользователя
        const token = jwt.sign(
            {
                id: userExists.id,
                email: userExists.email,
                role: userExists.role // Передача роли пользователя
            },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.json({ token });
    } catch (error) {
        console.error("Ошибка при входе пользователя:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};

const getAllUser = async (req, res) => {
    const { knex } = req.app.locals
    await knex.select('*')
        .from('users')
        .then(data => {
            return res.status(200).json({ data })
        })
        .catch(error => res.status(500).json({ error }))
}

const getUserById = async (req, res) => {
    const { knex } = req.app.locals
    const { id } = req.params
    if (!id) {
        return res.status(404).json("Пожалуйста, укажите id пользователя")
    }

    await knex('users')
        .where({
            id: id,
        })
        .then(data => {
            if (data.length === 0) {
                return res.status(200).json({ error: "Пользователь не найден" })
            }
            return res.status(200).json({ data })
        })
        .catch(error => {
            return res.status(500).json({ error })
        }
        )
}

const updateUser = async (req, res) => {
    const { knex } = req.app.locals
    const payload = req.body
    const { id } = req.params

    // console.log(payload.name)

    // if (!payload.name) {
    //     return res.status(404).json("Пожалуйста, укажите жанр")
    // }

    try {
        const data = await knex('users')
            .where({ id: id })
            .update({
                name: payload.name,
                email: payload.email,
                role: payload.year
            })

        return res.status(201).json({ user: data })
    }

    catch (error) {
        console.error("Ошибка при входе пользователя:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
}

const deleteUser = async (req, res) => {
    const { knex } = req.app.locals
    const payload = req.body
    // console.log(payload.name)

    if (!payload.id) {
        return res.status(404).json("Пожалуйста, укажите id пользователя")
    }

    await knex('users')
        .where({ id: payload.id })
        .del()
        .then(data => {
            if (data === 0) {
                return res.status(200).json({ error: "Пользователь не найден" })
            }
            return res.status(200).json({ data: "Пользователь удален" })
        })
        .catch(error => res.status(500).json({ error }))
}


module.exports = {
    getAllUser,
    getUserById,
    registrationUser,
    loginUser,
    updateUser,
    deleteUser,
}