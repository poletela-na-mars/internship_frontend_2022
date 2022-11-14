import {createAction} from "@reduxjs/toolkit";

const ActionType = {
    GET_ARTICLES: `GET_ARTICLES`,
    CHANGE_ARTICLES_LOADING_STATUS: `CHANGE_ARTICLES_LOADING_STATUS`,
    CHANGE_CURRENT_ARTICLE_ID: `CHANGE_CURRENT_ARTICLE_ID`,
    GET_ARTICLE_COMMENTS: `GET_ARTICLE_COMMENTS`,
    CHANGE_COMMENTS_LOADING_STATUS: `CHANGE_COMMENTS_LOADING_STATUS`,
    GET_CURRENT_ARTICLE: `GET_CURRENT_ARTICLE`,
    CHANGE_CURRENT_ARTICLE_LOADING_STATUS: `CHANGE_CURRENT_ARTICLE_LOADING_STATUS`,
    DROP_CURRENT_ARTICLE: `DROP_CURRENT_ARTICLE`,
    CHANGE_UPDATE_STATUS: `CHANGE_UPDATE_STATUS`
};

const ActionCreator = {
    getArticles: createAction(ActionType.GET_ARTICLES, payload => ({payload})),
    changeArticlesLoadingStatus: createAction(ActionType.CHANGE_ARTICLES_LOADING_STATUS, payload => ({payload})),
    changeCurrentArticleId: createAction(ActionType.CHANGE_CURRENT_ARTICLE_ID, payload => ({payload})),
    getArticleComments: createAction(ActionType.GET_ARTICLE_COMMENTS, payload => ({payload})),
    changeCommentsLoadingStatus: createAction(ActionType.CHANGE_COMMENTS_LOADING_STATUS, payload => ({payload})),
    getCurrentArticle: createAction(ActionType.GET_CURRENT_ARTICLE, payload => ({payload})),
    changeCurrentArticleLoadingStatus: createAction(ActionType.CHANGE_CURRENT_ARTICLE_LOADING_STATUS, payload => ({payload})),
    dropCurrentArticle: createAction(ActionType.DROP_CURRENT_ARTICLE, payload => ({payload})),
    changeUpdateStatus: createAction(ActionType.CHANGE_UPDATE_STATUS, payload => ({payload})),
};

export {ActionCreator, ActionType};