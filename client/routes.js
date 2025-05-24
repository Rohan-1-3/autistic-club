import { createBrowserRouter, redirect } from "react-router";
import HomepageLayout from "./src/components/Homepage/HomepageLayout";
import Homepage from "./src/components/Homepage/Homepage";
import UserpageLayout from "./src/components/Userpage/UserpageLayout";
import Login from "./src/components/Userpage/Login";
import Signup from "./src/components/Userpage/Signup";
import { Component } from "react";
import NotFound from "./src/components/NotFound";
import ChatroomLayout from "./src/components/Chatroom/ChatroomLayout";
import Chatroom from "./src/components/Chatroom/Chatroom";

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
                loader: async ()=>{
                    const respone = await fetch("/api/authenticate_user", { credentials: "include" })
                    if(respone.ok){
                        return redirect("/chatroom")
                    }
                    return null
                },
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
                    return { errors: errors.err}
                }
            },
            {
                path: "signup",
                Component: Signup,
                loader: async ()=>{
                    const respone = await fetch("/api/authenticate_user", { credentials: "include" })
                    if(respone.ok){
                        return redirect("/chatroom")
                    }
                    return null
                },
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
        ]
    },
    {
        path:"chatroom",
        Component: ChatroomLayout,
        children:[
            { 
                index: true, 
                Component: Chatroom,
                loader: async () => {
                    const response = await fetch("/api/authenticate_user", { credentials: "include" });
                    if (!response.ok) return redirect("/user/login");

                    const userData = await response.json();

                    const res = await fetch("/api/message/all");
                    if (res.status === 200) {
                        const messages = await res.json();
                        return { user: userData.user, messages };
                    }

                    return null;
                }
            }
        ],
        
    },
    {
        path: "*",
        Component: NotFound
    }
])