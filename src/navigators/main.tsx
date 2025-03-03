import React from "react";
import {RouterProvider, createBrowserRouter, createHashRouter} from 'react-router-dom';
import CreateAccount from "../Pages/CreateAccount/CreateAccount";
import QuestionShare from "../Pages/QuestionShare/QuestionShare";
import QuestionCreate from "../Pages/QuestionCreate/QuestionCreate";
import QuestionSteps from "../Pages/QuestionSteps/QuestionSteps";

const router = createHashRouter([
    {
        path: "/",
        children: [
            {
                path: "/",
                element: <QuestionSteps/>,
            },
            {
                path: "/questioncreate",
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
