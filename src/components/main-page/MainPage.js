import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import "./MainPage.scss";

import Header from "../header/Header";
import Loader from "../loader/Loader";
import LoadMoreButton from "../load-more-button/LoadMoreButton";
import ScrollTop from "../scroll-top/ScrollTop";
import Footer from "../footer/Footer";

import {fixDate} from "../../utils";
import {AsyncOperation} from "../../reducer/reducer";
import {ActionCreator} from "../../reducer/action-creator";

export const NUMBER_OF_ARTICLES = 100;
export const NUMBER_OF_PAGES = 5;

const MainPage = (props) => {
  const {
    articles, isEachArticleLoaded, numberOfPage,
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

  const getArticlesList = () => {
    const slicedArticles = articles.slice(0, (NUMBER_OF_ARTICLES / NUMBER_OF_PAGES) * (numberOfPage + 1));
    return slicedArticles.filter(it => it !== null).map((it) => {
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
          {getArticlesList()}
        </ul>
        <LoadMoreButton/>
        <ScrollTop displayAfter={100}/>
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
  isEachArticleLoaded: state.isEachArticleLoaded,
  numberOfPage: state.numberOfPage
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
