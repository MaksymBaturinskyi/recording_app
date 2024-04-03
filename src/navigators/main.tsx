import React from "react";
import {RouterProvider, createBrowserRouter, createHashRouter} from 'react-router-dom';
import CreateAccount from "../Pages/CreateAccount";
import QuestionShare from "../Pages/QuestionShare";
import QuestionCreate from "../Pages/QuestionCreate";

const router = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                path: "/",
                element: <QuestionCreate/>,
            },
            {
                path: "/share",
                element: <QuestionShare/>,
            },
            {
                path: "/accountcreate",
                element: <CreateAccount/>,
            },
        ],
    },
]);

export default function MainNavigator() {
    return (
        <RouterProvider router={router}/>
    );
}
