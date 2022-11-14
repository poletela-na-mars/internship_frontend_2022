import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import Header from "../header/Header";
import Loader from "../loader/Loader";
import ScrollTop from "../scroll-top/ScrollTop";
import Footer from "../footer/Footer";

import {fixDate} from "../../utils";
import {AsyncOperation} from "../../reducer/reducer";
import {ActionCreator} from "../../reducer/action-creator";

const MainPage = (props) => {
    const {
        articles, isEachArticleLoaded,
        getArticles, changeUpdateStatus
    } = props;

    useEffect(() => {
        const refreshInterval = setInterval(() => {
            changeUpdateStatus(true);
            getArticles();
        }, 60000);

        return () => {
            clearInterval(refreshInterval);
        };
    });

    const getArticlesList = (articles) => {
        return articles.filter(it => it !== null).map((it) => {
            const date = fixDate(it.time);

            return (
                <li key={it.id} className="article-item shadow-form">
                    <Link to={`/${it.id}`} className="article-item-link">{it.title}</Link>
                    <div className="article-item-info">
                        <div className="article-item-rating"><span className="blue-words">Rating:</span>&ensp;{it.score}
                        </div>
                        <div className="article-item-author"><span className="blue-words">Author:</span>&ensp;{it.by}
                        </div>
                        <div className="article-item-date"><span
                            className="blue-words">Date:</span>&ensp;{date}</div>
                    </div>
                </li>
            );
        });
    };

    if (isEachArticleLoaded) {
        return (
            <div className="block">
                <Header page={`MAIN_PAGE`} minimum={false}/>
                <ul className="list">
                    {getArticlesList(articles)}
                </ul>
                <ScrollTop/>
                <Footer/>
            </div>
        );
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
    articles: state.articles,
    isEachArticleLoaded: state.isEachArticleLoaded
});

const mapDispatchToProps = (dispatch) => ({
    getArticles: () => {
        dispatch(AsyncOperation.getArticles());
    },
    changeUpdateStatus: (status) => {
        dispatch(ActionCreator.changeUpdateStatus(status));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);