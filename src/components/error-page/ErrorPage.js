import React from "react";
import {Link} from "react-router-dom";

import "./ErrorPage.css";

import Header from "../header/Header";
import Footer from "../footer/Footer";

const ErrorPage = () => {
    return (
        <div className="error-block">
            <Header page={`ARTICLE_PAGE`} minimum={true}/>
            <div className="main-part-error">
                <h1 className="h1-message">Oops! It seems that something went wrong.</h1>
                <p className="p-message">You are on a non-existent page.
                    Perhaps it is outdated, has been deleted, or an incorrect
                    address has been entered in the address bar.
                </p>
                <Link to={`/`}>
                    <button className="blue-button error-button">Return to main page</button>
                </Link>
            </div>
            <Footer/>
        </div>
    );
};

export default ErrorPage;