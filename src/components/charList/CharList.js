import "./charList.scss";
import { Component } from "react/cjs/react.production.min";
import PropTypes from "prop-types";

import marvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner1";

class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 210,
    charEnded: false,
  };

  marvelService = new marvelService();

  componentDidMount() {
    this.onRequest();
    window.addEventListener("scroll", this.eventScroll);
  }

  // componentWillUnmount() {
  //   window.removeEventListener("scroll", this.eventScroll);
  // }

  // componentDidUpdate() {
  //   window.addEventListener("scroll", this.eventScroll);
  // }

  // eventScroll = (event) => {
  //   // нижняя граница документа
  //   console.log(document.documentElement.getBoundingClientRect());
  //   let windowRelativeBottom =
  //     document.documentElement.getBoundingClientRect().bottom;
  //   // если пользователь прокрутил достаточно далеко (< 100px до конца)
  //   if (windowRelativeBottom > document.documentElement.clientHeight + 100) {
  //     console.log("scrollBottom");
  //     // this.onRequest(this.state.offset);
  //   }
  // };

  onRequest = (offset) => {
    this.onCharListLoaging();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharListLoaded)
      .catch(this.onError);
  };

  onCharListLoaging = () => {
    this.setState({ newItemLoading: true });
  };

  onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9 || this.state.offset >= 1550) {
      console.log("<9");
      ended = true;
    }

    this.setState(({ offset, charList }) => ({
      charList: [...charList, ...newCharList],
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended,
    }));
  };

  onError = () => {
    this.setState({ error: true, loading: false });
  };

  itemsRef = [];

  setItemRef = (item) => {
    this.itemsRef.push(item);
  };

  onCharFocus = (id) => {
    // this.itemsRef.forEach((item) => {
    //   item.classList.remove("char__item_selected");
    // });
    // this.itemsRef[id].classList.add("char__item_selected");
    this.itemsRef[id].focus();
  };

  renderItems = (arr) => {
    const items = arr.map((item, i) => {
      const imgStyle = item.thumbnail.includes("image_not_available")
        ? { objectFit: "unset" }
        : { objectFit: "cover" };
      return (
        <li
          ref={this.setItemRef}
          tabIndex={0}
          className="char__item"
          key={item.id}
          onClick={() => {
            this.props.onCharSelected(item.id);
            this.onCharFocus(i);
          }}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              this.props.onCharSelected(item.id);
              this.onCharFocus(i);
            }
          }}
        >
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
    return <ul className="char__grid">{items}</ul>;
  };

  render() {
    const { charList, loading, error, newItemLoading, offset, charEnded } =
      this.state;
    const items = this.renderItems(charList);
    const errorMessage = error ? <ErrorMessage /> : null;
    const loader = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;
    return (
      <div className="char__list">
        {errorMessage} {loader} {content}
        <button
          className="button button__main button__long"
          onClick={() => {
            this.onRequest(offset);
          }}
          disabled={newItemLoading}
          style={{ display: charEnded ? "none" : "block" }}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
