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
            if(!response.success){
                return res.status(400).json({err: response.error})
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
            if (!user) return res.status(401).json({err: [info]});
            
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

const logoutUser = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return res.status(500).json({ message: 'Logout failed', error: err.message });
        }

        req.session.destroy(() => {
            res.clearCookie("connect.sid"); // adjust if your session cookie name is different
            res.status(200).json({ message: 'Logout successful' });
        });
    });
};

const updateUser = [
    validateUserName, validateUserCredentials, validateRequest,
    expressAsyncHandler(async (req, res)=>{
        const user = req.body.user;
        const response = await updateUserQuery(user);
        if(!response.success){
            return res.status(400).json({err: response.error})
        }
        res.status(201).json({user: user});
    })
]

const removeUser = expressAsyncHandler( async(req, res)=>{
    const userId = req.params.user_id;
    const response = await deleteUser(userId);
    if(!response.success){
        return res.status(400).json({err: response.error})
    }
    res.status(200).json({message: "User deleted successfully."})
})

const authenticateUser = expressAsyncHandler(async(req, res)=>{
    if(req.isAuthenticated()){
        res.status(200).json({user: req.user})
    }else{
        req.status(401).json({msg: "User Not Authenticated."})
    }
})

export { registerUser, loginUser, logoutUser, removeUser, updateUser, authenticateUser };

