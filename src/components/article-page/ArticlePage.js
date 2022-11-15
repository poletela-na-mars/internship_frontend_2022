import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import DOMPurify from "dompurify";

import "./ArticlePage.scss";

import Header from "../header/Header";
import Loader from "../loader/Loader";
import Comments from "../comments/Comments";
import ErrorPage from "../error-page/ErrorPage";
import ScrollTop from "../scroll-top/ScrollTop";
import Footer from "../footer/Footer";

import {fixDate} from "../../utils";
import {ActionCreator} from "../../reducer/action-creator";

const ArticlePage = (props) => {
    const {
        currentArticle,
        isCurrentArticleLoaded,
        changeCurrentArticleId,
        changeCurrentArticleLoadingStatus,
        dropCurrentArticle
    } = props;

    if (isCurrentArticleLoaded) {
        changeCurrentArticleId(currentArticle.id);
        return (
            <div className="block">
                <Header page={`ARTICLE_PAGE`} minimum={false}/>
                <div className="main-part">
                    <div className="about-article">
                        <div className="article-panel">
                            <Link to={`/`} onClick={() => {
                                dropCurrentArticle();
                                changeCurrentArticleLoadingStatus(false);
                            }}>
                                <div className="go-back-button"/>
                            </Link>
                            <h1><a target="_blank" href={currentArticle.url}
                                   style={currentArticle.url ? {} : {color: "black"}}
                                   className="article-title">{currentArticle.title}</a></h1>
                        </div>
                        {currentArticle.text ? <p className="optional-text"
                                                  dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(currentArticle.text)}}>
                        </p> : ""}
                        <div className="article-info shadow-form">
                            {currentArticle.url ?
                                <a target="_blank" href={currentArticle.url} className="read-button"
                                   rel="noreferrer">Читать</a> :
                                <div className="read-button-grey"/>}
                            <div className="article-date"><span
                                className="blue-words">Date:</span>&ensp;{fixDate(currentArticle.time)}
                            </div>
                            <div className="article-author"><span
                                className="blue-words">Author:</span>&ensp;{currentArticle.by}
                            </div>
                        </div>
                        <div className="comments-counter-container">
                            <p>{currentArticle.descendants ? (currentArticle.descendants === 1 ? `1 comment` :
                                `${currentArticle.descendants} comments`) : `0 comments`}</p>
                        </div>
                    </div>
                    <Comments/>
                </div>
                <Footer/>
                <ScrollTop displayAfter={100}/>
            </div>
        );
    } else if (currentArticle === -1) {
        return <ErrorPage/>;
    } else {
        return (
            <div className="load-container">
                <div className="load">
                    <Loader/>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    currentArticle: state.currentArticle,
    isCurrentArticleLoaded: state.isCurrentArticleLoaded
});

const mapDispatchToProps = (dispatch) => ({
    changeCurrentArticleLoadingStatus: (status) => {
        dispatch(ActionCreator.changeCurrentArticleLoadingStatus(status));
    },
    dropCurrentArticle: () => {
        dispatch(ActionCreator.dropCurrentArticle());
    },
    changeCurrentArticleId: (articleId) => {
        dispatch(ActionCreator.changeCurrentArticleId(articleId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);
