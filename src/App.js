import React from "react";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";

import MainPage from "./components/main-page/MainPage";
import ArticlePage from "./components/article-page/ArticlePage";

import {AsyncOperation} from "./reducer/reducer";

const App = (props) => {
  const {getCurrentArticle, getArticles} = props;
  const LoadingArticles = () => {
    getArticles();
    return <MainPage/>;
  };

  const LoadingArticle = () => {
    getCurrentArticle(window.location.pathname.slice(1));
    return <ArticlePage/>
  };

  return (
    <Switch>
      <Route exact path="/">
        <LoadingArticles/>
      </Route>
      <Route path="/:id">
        <LoadingArticle/>
      </Route>
    </Switch>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getCurrentArticle: (articleId) => {
    dispatch(AsyncOperation.getCurrentArticle(articleId));
  },
  getArticles: () => {
    dispatch(AsyncOperation.getArticles());
  }
});

//TODO: -clean-up in code
//      -!pagination
//      -security
//      -autoprefixer

export default connect(null, mapDispatchToProps)(App);
