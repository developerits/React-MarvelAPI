import "./charList.scss";
import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner1";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const CharList = (props) => {
  const [charList, setCharList] = useState([]);

  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);

  const { loading, error, getAllCharacters } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

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

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllCharacters(offset).then(onCharListLoaded);
  };

  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9 || offset >= 1550) {
      console.log("<9");
      ended = true;
    }

    setCharList((charList) => [...charList, ...newCharList]);
    setNewItemLoading(() => false);
    setOffset((offset) => offset + 9);
    setCharEnded(() => ended);
  };

  const itemsRef = useRef([]);

  const onCharFocus = (id) => {
    itemsRef.current[id].focus();
  };

  const renderItems = (arr) => {
    const items = arr.map((item, i) => {
      const imgStyle = item.thumbnail.includes("image_not_available")
        ? { objectFit: "unset" }
        : { objectFit: "cover" };
      return (
        <CSSTransition key={i} timeout={300} classNames="item">
          <li
            ref={(el) => (itemsRef.current[i] = el)}
            tabIndex={0}
            className="char__item"
            key={item.id}
            onClick={() => {
              props.onCharSelected(item.id);
              onCharFocus(i);
            }}
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "Enter") {
                props.onCharSelected(item.id);
                onCharFocus(i);
              }
            }}
          >
            <img src={item.thumbnail} alt={item.name} style={imgStyle} />
            <div className="char__name">{item.name}</div>
          </li>
        </CSSTransition>
      );
    });
    return (
      <ul className="char__grid">
        {<TransitionGroup component={null}>{items}</TransitionGroup>}
      </ul>
    );
  };

  if (loading) {
    import("./someFunc")
      .then((obj) => obj.default())
      .catch();
  }
  const items = renderItems(charList);
  console.log(items);
  const errorMessage = error ? <ErrorMessage /> : null;
  const loader = loading && !newItemLoading ? <Spinner /> : null;
  return (
    <div className="char__list">
      {errorMessage} {loader}
      {items}
      <button
        className="button button__main button__long"
        onClick={() => {
          onRequest(offset);
        }}
        disabled={newItemLoading}
        style={{ display: charEnded ? "none" : "block" }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
