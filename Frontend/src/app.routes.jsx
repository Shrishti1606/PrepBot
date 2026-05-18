import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login.jsx";
import Register from "./features/auth/pages/Register.jsx";
import Protected from "./features/auth/components/Protected.jsx";
import Home from "./features/interview/pages/Home.jsx";
import Interview from "./features/interview/pages/interview.jsx";
import Landing from "./features/auth/pages/Landing.jsx"



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />       
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/home",
        element: <Protected><Home /></Protected>
    },{
        path: "/interview/:interviewId",
        element: <Protected><Interview /></Protected>
    }
]);