import { hash } from "bcryptjs";
import { body, validationResult } from "express-validator"
import { addAUser, deleteUser, updateUser as updateUserQuery } from "../db/queries.js";
import passport from "passport";
import expressAsyncHandler from "express-async-handler";
import { validateRequest } from "../configs/validateRequest.js";

const validateUserName = [
    body('firstname').trim().notEmpty().withMessage("First name cannot be empty.").bail()
    .isLength({min: 4, max: 16}).withMessage("First name length to be between 4 and 16.")
    .escape(),
    body("lastname").trim().notEmpty().withMessage("Last name cannot be empty.").bail()
    .isLength({min: 4, max: 16}).withMessage("Last name length to be between 4 and 16.")
    .escape(),
]

const validateUserCredentials = [
    body("username").trim().notEmpty().withMessage("Username cannot be empty.").bail()
    .isLength({min: 4, max: 16}).withMessage("Username length to be between 4 and 16.")
    .escape(),
    body("password").trim().notEmpty().withMessage("Password cannot be empty").bail()
    .isLength({min: 8, max: 16}).withMessage("Password length to be between 8 and 16.")
    .escape()
]

const registerUser = [
    validateUserName, validateUserCredentials, validateRequest,
    expressAsyncHandler(
        async (req, res)=>{
            const hashedPass = await hash(req.body.password, 10);
            const user = {...req.body, 
                            password: hashedPass,
                            isMember: false,
                            isAdmin: false    
                        };
            const response = await addAUser(user);
            if(response.detail){
                return res.status(400).json({err: response})
            }
            res.status(201).json({id: response})
        }
    )
]

const loginUser = [
    validateUserCredentials, validateRequest,
    expressAsyncHandler(async (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) return next(err);
            if (!user) return res.status(401).json({ message: info.message });

            req.logIn(user, (err) => {
                if (err) return next(err);
                res.status(200).json({
                    message: 'Login successful',
                    user: {
                        id: user.id,
                        username: user.username,
                        isMember: user.isMember,
                        isAdmin: user.isAdmin
                    }
                });
            });
        })(req, res, next);
    })
];

const logoutUser = (req, res) => {
    try {
        req.logout();
        res.status(200).json({ message: 'Logout successful' });
    } catch (err) {
        res.status(500).json({ message: 'Logout failed', error: err.message });
    }
};

const updateUser = [
    validateUserName, validateUserCredentials, validateRequest,
    expressAsyncHandler(async (req, res)=>{
        const user = req.body.user;
        await updateUserQuery(user);
        res.status(201).json({user: user});
    })
]

const removeUser = expressAsyncHandler( async(req, res)=>{
    const userId = req.params.user_id;
    await deleteUser(userId);
    res.status(200).json({message: "User deleted successfully."})
})

export { registerUser, loginUser, logoutUser, removeUser, updateUser };

