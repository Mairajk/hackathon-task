import { stringToHash } from "bcrypt-inzi";
import { userModel } from "../model.mjs";


/** ----- Signup Controller Start ----------- */

export const signup = async (req, res) => {
    try {

        const adminEmail = process.env.admin_email || 'admin@gmail.com'

        let isAdmin;
        let { body: { email } } = req
        const { body: {
            password, fullName } } = req
        email = email.toLowerCase();


        const user = await userModel.findOne({ email }).exec()

        if (user) {
            console.log("user ===> ", user);

            console.log("user exist already ===>", user);

            return res.status(400).json({
                message: "User with this email is already exist! please try a different one.",
            });
        }

        const hashedPassword = await stringToHash(password)

        const newUser = await userModel.create(
            {
                fullName,
                email,
                password: hashedPassword,
            }, {
            _id: 1,
            email: 1,
            password: 1,
            fullName: 1,
        }).exec()

        if (!newUser) {
            throw new Error
        }

        const { email: { user_email }, password: { user_password }, _id, user_fullname } = newUser

        isAdmin = (user_email === adminEmail)

        const token = await jwt.sign(
            {
                user: {
                    _id,
                    email: user_email,
                    password: user_password,
                    isAdmin,
                },
                iat: Math.floor(Date.now() / 1000) - 30,
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
            },
            SECRET
        );

        console.log("token ===> ", token);

        res.cookie("Token", token, {
            maxAge: 86_400_000,
            httpOnly: true,
        });

        return res.status(201).json({
            message: "User created successfully.",
            data: user,
        });

    } catch (error) {
        console.log("server error: ", err);
        return res.status(500).json({
            message: "Server error !",
            error,
        });
    }
}

/** -----------------End------------------- */




/** ----- Login Controller Start ----------- */

export const login = async (req, res) => {
    try {

        const adminEmail = process.env.admin_email || 'admin@gmail.com'

        let { body: { email } } = req;
        const { body: { password } } = req;
        email = email.toLowerCase();
        let isAdmin;

        const user = await userModel.findOne(
            { email: body.email }, {
            email: 1, password: 1, fullName: 1,
        }).exec()

        if (!user) {
            return res.status(404).json({
                message: 'Invalid email! User not found'
            })
        }

        const { email: { user_email }, password: { user_password }, fullName: { user_fullname }, _id, } = user

        const isMatch = await varifyHash(password, user_password)
        if (!isMatch) {
            return res.status(400).json({
                message: 'Wrong password !'
            })
        }

        isAdmin = (user_email === adminEmail)

        const token = await jwt.sign(
            {
                user: {
                    _id,
                    fullName: user_fullname,
                    email: user_email,
                    password: user_password,
                    isAdmin,
                },
                iat: Math.floor(Date.now() / 1000) - 30,
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
            },
            SECRET
        );

        console.log("token ===> ", token);

        res.cookie("Token", token, {
            maxAge: 86_400_000,
            httpOnly: true,
        });

        return res.status(200).json({
            message: "Log in successfull !",
        });

    } catch (error) {
        console.log("server error ===>", err);
        return (
            res.status(500).json({
                message: "Something went wrong! try again later",
            }))
    }
}

/** -----------------End------------------- */
