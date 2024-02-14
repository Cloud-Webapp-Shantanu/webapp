const User = require('../model/User.js');
const bcrypt = require('bcrypt');
const basicAuthenticator = require('../service/UserBasicAuthenticatorService.js');
const regex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const getUserById = async (req, res) => {
    try {
        basicAuthenticator(req, res, () => {
            res.set("cache-control", "no-cache");
            const userId = req.user.id;
            console.log(userId);
            if (Object.keys(req.body).length > 0 || !regex.test(userId)) {
                console.error("Error retrieving user by ID: Invalid request or ID format.");
                return res.status(400).json({});
            }
            if (Object.keys(req.query).length !== 0) {
                console.error('Invalid request parameters for GET:', req.query);
                return res.status(400).header('Cache-Control', 'no-cache').send();
            }
            if (req.get('Content-Length') && parseInt(req.get('Content-Length')) !== 0) {
                console.error('Invalid content for GET request:', req.body);
                return res.status(400).header('Cache-Control', 'no-cache').send();
            }
            (async () => {
                const user = await User.findByPk(userId);


                if (!user) {
                    console.error("Error retrieving user by ID: User not found");
                    return res.status(404).json({ message: 'User not found' });
                }
                console.info("User retrieved successfully");
                delete user.dataValues.password
                return res.status(200).json(user);
            })();
        });
    } catch (error) {
        console.error("Error retrieving user by ID:", error.message);
        return res.status(500).json({});
    }
}

const createUser = async (req, res) => {
    try {
        if (Object.keys(req.query).length !== 0) {
            console.error('Invalid request parameters for POST:', req.query);
            return res.status(400).header('Cache-Control', 'no-cache').send();
        }
        if (req.headers.authorization !== undefined) {
            console.error('Invalid request authorization parameters for POST');
            return res.status(400).header('Cache-Control', 'no-cache').send();
        }
        const allowedFields = ['first_name', 'last_name', 'email', 'password', 'account_created', 'account_updated'];
        const unexpectedFields = Object.keys(req.body).filter(
            (field) => !allowedFields.includes(field)
        );
        res.set("cache-control", "no-cache");
        if (unexpectedFields.length > 0) {
            console.error("Error updating user by ID: Invalid request or ID format.");
            return res.status(400).json({
                message: "Unexpected fields in the request body",
                unexpectedFields
            });
        }
        if (
            Object.keys(req.body).length == 0 ||
            req.body.first_name === undefined ||
            req.body.last_name === undefined ||
            req.body.email === undefined ||
            req.body.password === undefined
        ) {
            console.error("Error creating user: Request body is invalid or missing required fields.");
            return res.status(400).json({ message: "Body Invalid" });
        }
        if (req.body.password === "" || req.body.email === "") {
            console.error("Error creating user: Email and Password cannot be empty");
            return res.status(400).json({ message: "Email and Password cannot be empty" });
        }
        if (typeof req.body.first_name === "number") {
            console.error("Error creating user: Firstname cannot be numeric");
            return res.status(400).json({ message: "Firstname cannot be numeric" });
        }
        if (typeof req.body.last_name === "number") {
            console.error("Error creating user: Lastname cannot be numeric");
            return res.status(400).json({ message: "Lastname cannot be numeric" });
        }
        if (!isValidEmail(req.body.email)) {
            console.error("Error creating user: Invalid email format");
            return res.status(400).json({ message: "Invalid email format" });
        }
        if (typeof req.body.password === "number") {
            console.error("Error creating user: Password cannot be numeric");
            return res.status(400).json({ message: "Password cannot be numeric" });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.email,
            password: hashedPassword
        }
        const newUser = await User.create(user);
        // Deleting the password from object before returning response
        delete newUser.dataValues.password;
        console.info("User created successfully");
        return res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating user:", error.message);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: "User with email address already exists" });
        }
        return res.status(503).json({});
    }
}

const updateUserById = async (req, res) => {
    try {
        basicAuthenticator(req, res, () => {
            if (Object.keys(req.query).length !== 0) {
                console.error('Invalid request parameters for PUT:', req.query);
                return res.status(400).header('Cache-Control', 'no-cache').send();
            }
            const allowedFields = ['first_name', 'last_name', 'password'];
            const unexpectedFields = Object.keys(req.body).filter(
                (field) => !allowedFields.includes(field)
            );
            if (unexpectedFields.length > 0) {
                console.error("Error updating user by ID: Invalid request or ID format.");
                return res.status(400).json({
                    message: "Unexpected fields in the request body",
                    unexpectedFields
                });
            }

            if (
                Object.keys(req.body).length == 0 ||
                req.body.first_name === undefined ||
                req.body.last_name === undefined ||
                req.body.password === undefined
            ) {
                console.error("Error creating user: Request body is invalid or missing required fields.");
                return res.status(400).json({ message: "Body Invalid" });
            }
            if (req.body.password === "") {
                console.error("Error creating user: Password cannot be empty");
                return res.status(400).json({ message: "Password cannot be empty" });
            }
            if (typeof req.body.first_name === "number") {
                console.error("Error creating user: Firstname cannot be numeric");
                return res.status(400).json({ message: "Firstname cannot be numeric" });
            }
            if (typeof req.body.last_name === "number") {
                console.error("Error creating user: Lastname cannot be numeric");
                return res.status(400).json({ message: "Lastname cannot be numeric" });
            }
            if (typeof req.body.password === "number") {
                console.error("Error creating user: Password cannot be numeric");
                return res.status(400).json({ message: "Password cannot be numeric" });
            }
            const userId = req.user.id;

            if (!regex.test(userId)) {
                console.error("Error updating user by ID: Invalid UUID format for userId. ID - ", userId);
                return res.status(400).json({ message: "Invalid UUID format for userId" });
            }
            (async () => {
                const foundUser = await User.findByPk(userId);
                if (!foundUser) {
                    console.error("Error updating user by ID: User not found");
                    return res.status(404).json({ message: "User not found" });
                }
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                const user = {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    password: hashedPassword,
                    account_updated: new Date()
                }
                const updatedUser = await User.update(user, {
                    where: { id: userId }
                });
                console.info("User updated successfully" + updatedUser);
                return res.status(204).json();
            })();
        });
    } catch (error) {
        console.error("Error updating user by ID:", error.message);
        return res.status(503).json({});
    }
}

module.exports = {
    getUserById,
    createUser,
    updateUserById
};