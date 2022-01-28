import { useState, useEffect } from "react";
import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";

//TO DO
// 1) Try It - загрузка нового персонажа
// 2) поменять object-fit у картинки image not found на object-fit: contain
// 3) Реализовать charList, сделать запрос, получить 9 персонажей, построить интерфейс. Не забыть про уникальные идентификаторы персонажей

const RandomChar = () => {
  const [char, setChar] = useState({});

  useEffect(() => {
    updateChar();
  }, []);

  const { loading, error, getCharacter, clearError, process, setProcess } =
    useMarvelService();

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const randomInteger = (min, max) => {
    // случайное число от min до (max+1)
    let rand = Math.random() * (max - min) + min;
    return Math.floor(rand);
  };

  const updateChar = () => {
    clearError();
    const id = randomInteger(1011000, 1011400);
    getCharacter(id)
      .then(onCharLoaded)
      .then(() => setProcess("confirmed"));
  };

  // const errorMessage = error ? <ErrorMessage /> : null;
  // const spinner = loading ? <Spinner /> : null;
  // const content = !(loading || error) ? <View char={char} /> : null;
  return (
    <div className="randomchar">
      {setContent(process, View, char)}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button className="button button__main" onClick={updateChar}>
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

const View = ({ data }) => {
  console.log(data);
  const { name, description, thumbnail, homepage, wiki } = data;
  const descr =
    description && description.length > 197
      ? description.slice(0, 197) + "..."
      : description;

  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        className="randomchar__img"
        // style={
        //   thumbnail.includes("image_not_available")
        //     ? { objectFit: "contain" }
        //     : null
        // }
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{descr}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
