import initialState from "./initial-state";
import {ActionType, ActionCreator} from "./action-creator";
import {getArticles, getCommentsTree, getArticle} from "../api";
import {createReducer} from "@reduxjs/toolkit";

const AsyncOperation = {
    getArticles: () => async (dispatch) => {
        const articles = await getArticles();

        dispatch(ActionCreator.getArticles(articles));
        dispatch(ActionCreator.changeArticlesLoadingStatus(true));
    },
    getCurrentArticle: (articleId) => async (dispatch) => {
        const article = await getArticle(articleId);
    
        if (article !== null) {
            const comments = await getCommentsTree(article);

            dispatch(ActionCreator.getCurrentArticle(article));
            dispatch(ActionCreator.getArticleComments(comments));
            dispatch(ActionCreator.changeCurrentArticleLoadingStatus(true));
            dispatch(ActionCreator.changeCommentsLoadingStatus(true));
        } else {
            dispatch(ActionCreator.getCurrentArticle(-1));
        }
    }
};

const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(ActionType.CHANGE_ARTICLES_LOADING_STATUS, (state, action) => {
            state.isEachArticleLoaded = action.payload;
        })
        .addCase(ActionType.GET_ARTICLES, (state, action) => {
            state.articles = action.payload;
        })
        .addCase(ActionType.CHANGE_CURRENT_ARTICLE_ID, (state, action) => {
            state.currentArticleId = action.payload;
        })
        .addCase(ActionType.GET_ARTICLE_COMMENTS, (state, action) => {
            state.articleComments = action.payload;
        })
        .addCase(ActionType.CHANGE_COMMENTS_LOADING_STATUS, (state, action) => {
            state.isEachCommentLoaded = action.payload;
        })
        .addCase(ActionType.GET_CURRENT_ARTICLE, (state, action) => {
            state.currentArticle = action.payload;
        })
        .addCase(ActionType.CHANGE_CURRENT_ARTICLE_LOADING_STATUS, (state, action) => {
            state.isCurrentArticleLoaded = action.payload;
        })
        .addCase(ActionType.DROP_CURRENT_ARTICLE, (state) => {
            state.currentArticleId = null;
        })
        .addCase(ActionType.CHANGE_UPDATE_STATUS, (state, action) => {
            state.updateStatus = action.payload;
        })
        .addCase(ActionType.CHANGE_NUMBER_OF_PAGE, (state, action) => {
            state.numberOfPage = action.payload;
        })
        .addDefaultCase((state) => {
            Object.assign(state, initialState);
        })
});

export {reducer, AsyncOperation};
