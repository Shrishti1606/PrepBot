import { createBrowserRouter } from "react-router";
import Log from "./features/auth/pages/Log.jsx";
import Reg from "./features/auth/pages/Reg.jsx";
import Protected from "./features/auth/components/Protected.jsx";
import Home from "./features/interview/pages/Home.jsx";
import Interview from "./features/interview/pages/interview.jsx";



export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Log/>
    },
    {
        path: "/register",
        element: <Reg />
    },
    {
        path: "/",
        element: <Protected><Home /></Protected>
    },{
        path: "/interview/:interviewId",
        element: <Protected><Interview /></Protected>
    }
]);