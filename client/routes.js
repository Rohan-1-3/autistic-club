import { createBrowserRouter, redirect } from "react-router";
import HomepageLayout from "./src/components/Homepage/HomepageLayout";
import Homepage from "./src/components/Homepage/Homepage";
import UserpageLayout from "./src/components/Userpage/UserpageLayout";
import Login from "./src/components/Userpage/Login";
import Signup from "./src/components/Userpage/Signup";
import { Component } from "react";
import NotFound from "./src/components/NotFound";

export const routes = createBrowserRouter([
    {
        path: "/",
        Component: HomepageLayout,
        children:[
            {index: true, Component: Homepage}
        ]
    },
    {
        path: "user",
        Component: UserpageLayout,
        children:[
            {
                path: "login",
                Component: Login,
                action: async ({request})=>{
                    const formData = await request.formData();
                    const payload = Object.fromEntries(formData.entries());
                    const response = await fetch("/api/login",{
                        method: "POST",
                        headers:{
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(payload)
                    })
                    if(response.status === 200){
                        return redirect("/chatroom")
                    }
                    const errors = await response.json()
                    return { errors: errors}
                }
            },
            {
                path: "signup",
                Component: Signup,
                action: async ({request})=>{
                    const formData = await request.formData();
                    const pass = formData.get("password");
                    const confirmPass = formData.get("confirmPassword")
                    if(pass !== confirmPass){
                        return { errors: [
                            {
                                msg: "Confirmation password is not same."
                            }
                        ]}
                    }
                    const payload = Object.fromEntries(formData.entries());
                    const response = await fetch("/api/register",{
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(payload)
                    })
                    if(response.status === 201){
                        return redirect("/user/login")
                    }
                    const error = await response.json()
                    console.log(error)
                    return { errors: error.err}
                }
            },
            // {
            //     element: ,
            //     children: {
            //         path: "chatroom", Component
            //     }
            // }
        ]
    },
    {
        path: "*",
        Component: NotFound
    }
])