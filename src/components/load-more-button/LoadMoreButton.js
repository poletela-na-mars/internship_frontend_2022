import {ActionCreator} from "../../reducer/action-creator";
import {connect} from "react-redux";

import "./LoadMoreButton.scss";

import {NUMBER_OF_PAGES} from "../main-page/MainPage";

const LoadMoreButton = (props) => {
  const {
    numberOfPage, changeNumberOfPage
  } = props;

  const onLoadMoreButtonClick = () => {
    changeNumberOfPage(numberOfPage + 1)
  };

  return numberOfPage < NUMBER_OF_PAGES - 1 ? <button className="blue-button load-more-button" onClick={(evt) => {
    onLoadMoreButtonClick(evt);
  }}>Load More</button> : "";
};

const mapStateToProps = (state) => ({
  numberOfPage: state.numberOfPage
});

const mapDispatchToProps = (dispatch) => ({
  changeNumberOfPage: (status) => {
    dispatch(ActionCreator.changeNumberOfPage(status));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadMoreButton);
