import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import { Component } from "react";
import Home from "../pages/Home/Home/Home";
import Products from "../pages/Products/Products";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import Profile from "../pages/Profile/Profile";
import PrivateRoute from "./PrivateRoute";
import Profile2 from "../pages/Profile/Profile2";
import Bookshelf from "../pages/Bookshelf/Bookshelf";
import AddBook from "../pages/Add_Book/AddBook";
import MyBooks from "../pages/My_Books/MyBooks";
import BookDetails from "../pages/BookDetails/BookDetails";
import UpdateBookList from "../pages/Update_Book/UpdateBookList";
import UpdateBook from "../pages/Update_Book/UpdateBook";
import Error404Page from "../components/Error404Page";



export const router = createBrowserRouter([

    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "/bookshelf",
                Component: Bookshelf
            },
            {

                path: "/books/:id",
                element: <BookDetails />

            },
            {
                path: "/addbook",
                element: <PrivateRoute><AddBook /></PrivateRoute>,
            },
            {
                path: "/updatebook",
                element: <PrivateRoute><UpdateBookList /></PrivateRoute>,
            },
            {
                path: "/updatebook/:id",
                element: <PrivateRoute><UpdateBook /></PrivateRoute>
            },
            {
                path: "/mybooks",
                element: <PrivateRoute><MyBooks /></PrivateRoute>,
            },
            {
                path: "/profile",
                element: <PrivateRoute><Profile></Profile></PrivateRoute>,
            },
            {
                path: "*",
                Component: Error404Page
            },


        ]

    },

    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    },
]);
