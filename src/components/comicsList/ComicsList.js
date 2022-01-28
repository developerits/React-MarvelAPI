import "./comicsList.scss";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import uw from "../../resources/img/UW.png";
import xMen from "../../resources/img/x-men.png";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner1";

const setContent = (process, Component, newItemLoading) => {
  switch (process) {
    case "waiting":
      return <Spinner />;
    case "loading":
      return newItemLoading ? <Component /> : <Spinner />;
    case "confirmed":
      return <Component />;
    case "error":
      return <ErrorMessage />;
    default:
      throw new Error("Unexpected process state");
  }
};

const ComicsList = (props) => {
  const [comicsList, setComicsList] = useState([]);
  const [offset, setOffset] = useState(210);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [comicsEnded, setComicsEnded] = useState(false);

  const { loading, error, getAllComics, process, setProcess } =
    useMarvelService();
  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllComics(offset)
      .then(onComicsListLoaded)
      .then(() => {
        setProcess("confirmed");
      });
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
          <Link to={`/comics/${item.id}`}>
            <img
              src={item.thumbnail}
              alt={item.title}
              className="comics__item-img"
            />
            <div className="comics__item-name">{item.title}</div>
            <div className="comics__item-price">{item.price}</div>
          </Link>
        </li>
      );
    });
    return <ul className="comics__grid">{items}</ul>;
  };

  // const items = renderItems(comicsList);
  // const errorMessage = error ? <ErrorMessage /> : null;
  // const loader = loading && !newItemLoading ? <Spinner /> : null;
  return (
    <div className="comics__list">
      {setContent(process, () => renderItems(comicsList), newItemLoading)}
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
