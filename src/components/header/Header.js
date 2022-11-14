import React, {useState} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import "./Header.css";

import {ActionCreator} from "../../reducer/action-creator";
import {AsyncOperation} from "../../reducer/reducer";

const Header = (props) => {
    const {
        changeCurrentArticleLoadingStatus, dropCurrentArticle,
        getArticles, changeCommentsLoadingStatus,
        getCurrentArticle, changeUpdateStatus, page, minimum,
        currentArticleId, isEachCommentLoaded, updateStatus,
    } = props;
    const [updateButtonToggled, setUpdateButtonToggleStatus] = useState(false);

    setTimeout(() => {
        setUpdateButtonToggleStatus(false);
        changeUpdateStatus(false);
    }, 3000);

    const renderHeaderControls = () => {
        if (!minimum) {
            if (page === `MAIN_PAGE`) {
                return (
                    <div
                        className={`update-img${(updateButtonToggled || updateStatus) ? ` update-img-animation` : ``}`}
                        onClick={() => {
                            setUpdateButtonToggleStatus(true);
                            getArticles();
                        }}/>
                );
            } else if (page === 'ARTICLE_PAGE') {
                return (
                    <div>
                        <div
                            className={`update-img${((updateButtonToggled && !isEachCommentLoaded) || updateStatus) ? ` update-img-animation` : ``}`}
                            onClick={() => {
                                setUpdateButtonToggleStatus(true);
                                changeCommentsLoadingStatus(false);
                                getCurrentArticle(currentArticleId);
                            }}/>
                    </div>
                );
            }
        } else {
            return null;
        }
    };

    return (
        <>
            <header>
                <Link style={{textDecoration: 'none', color: 'inherit'}} to={`/`} onClick={() => {
                    dropCurrentArticle();
                    changeCurrentArticleLoadingStatus(false);
                }}>
                    <h1 className="header-h1">Hacker News</h1>
                </Link>
                {renderHeaderControls()}
            </header>
        </>
    );
};

const mapStateToProps = (state) => ({
    currentArticleId: state.currentArticleId,
    isEachCommentLoaded: state.isEachCommentLoaded,
    updateStatus: state.updateStatus
});

const mapDispatchToProps = (dispatch) => ({
    changeCurrentArticleLoadingStatus: (status) => {
        dispatch(ActionCreator.changeCurrentArticleLoadingStatus(status));
    },
    dropCurrentArticle: () => {
        dispatch(ActionCreator.dropCurrentArticle());
    },
    getArticles: () => {
        dispatch(AsyncOperation.getArticles());
    },
    changeCommentsLoadingStatus: (status) => {
        dispatch(ActionCreator.changeCommentsLoadingStatus(status));
    },
    getCurrentArticle: (articleId) => {
        dispatch(AsyncOperation.getCurrentArticle(articleId));
    },
    changeUpdateStatus: (status) => {
        dispatch(ActionCreator.changeUpdateStatus(status));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);