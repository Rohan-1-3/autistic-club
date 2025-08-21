import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserByUsername, getUser } from "../db/queries.js";
import { compare } from "bcryptjs";

passport.use(
    new LocalStrategy(async (username, password, done)=>{
        try{
            const response = await getUserByUsername(username);
            const user = response.data;
            
            if(!user){
                return done(null, false, {msg: "Incorrect Username"});
            }

            const match = await compare(password, user.password)
            if(!match){
                return done(null, false, { msg: "Incorrect Password"});
            }

            return done(null, user);
        }catch(err){
            return done(err);
        }
    })
)

passport.serializeUser((user, done)=>{
    done(null, user.id);
})

passport.deserializeUser(async (id, done)=>{
    try{
        const response = await getUser(id);
        const user = response.data;
        done(null, user);
    }catch(err){
        done(err);
    }
});

export default passport;