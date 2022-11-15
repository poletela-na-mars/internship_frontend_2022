import {ActionCreator} from "../../reducer/action-creator";
import {connect} from "react-redux";

import {NUMBER_OF_PAGES} from "../main-page/MainPage";

const LoadMoreButton = (props) => {
  const {
    numberOfPage, changeNumberOfPage
  } = props;

  const onLoadMoreButtonClick = (evt) => {
    changeNumberOfPage(numberOfPage + 1)
    if (numberOfPage >= NUMBER_OF_PAGES - 2) {
      evt.target.style.display = "none";
    }
  };

  return <button className="blue-button load-more-button" onClick={(evt) => {
    onLoadMoreButtonClick(evt);
  }}>Load More</button>;
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
