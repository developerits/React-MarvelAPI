import "./comicsList.scss";
import { useState, useEffect, useRef } from "react";
import uw from "../../resources/img/UW.png";
import xMen from "../../resources/img/x-men.png";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner1";

const ComicsList = (props) => {
  const [comicsList, setComicsList] = useState([]);
  const [offset, setOffset] = useState(210);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [comicsEnded, setComicsEnded] = useState(false);

  const { loading, error, getComics } = useMarvelService();
  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getComics(offset).then(onComicsListLoaded);
  };

  const onComicsListLoaded = (newComicsList) => {
    let ended = false;
    if (newComicsList.length < 8 || offset >= 1550) {
      console.log("<8");
      ended = true;
    }

    setComicsList((comicsList) => [...comicsList, ...newComicsList]);
    setNewItemLoading(false);
    setOffset((offset) => offset + 9);
    setComicsEnded(ended);
  };

  const renderItems = (arr) => {
    const items = arr.map((item, i) => {
      return (
        <li key={i} className="comics__item">
          <a href={item.homepage}>
            <img
              src={item.thumbnail}
              alt={item.title}
              className="comics__item-img"
            />
            <div className="comics__item-name">{item.title}</div>
            <div className="comics__item-price">{item.price}</div>
          </a>
        </li>
      );
    });
    return <ul className="comics__grid">{items}</ul>;
  };

  const items = renderItems(comicsList);
  const errorMessage = error ? <ErrorMessage /> : null;
  const loader = loading && !newItemLoading ? <Spinner /> : null;
  return (
    <div className="comics__list">
      {items} {errorMessage} {loader}
      <button
        onClick={() => {
          onRequest(offset);
        }}
        disabled={newItemLoading}
        className="button button__main button__long"
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
