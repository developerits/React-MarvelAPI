import { Component } from "react/cjs/react.production.min";
import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import MarvelService from "../../services/MarvelService";
//TO DO
// 1) Try It - загрузка нового персонажа
// 2) поменять object-fit у картинки image not found на object-fit: contain
// 3) Реализовать charList, сделать запрос, получить 9 персонажей, построить интерфейс. Не забыть про уникальные идентификаторы персонажей

class RandomChar extends Component {
  state = {
    char: {},
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.updateChar();
  }

  marvelService = new MarvelService();

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };

  onCharLoading = () => {
    this.setState({ loading: true });
  };

  randomInteger = (min, max) => {
    // случайное число от min до (max+1)
    let rand = Math.random() * (max - min) + min;
    return Math.floor(rand);
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  updateChar = () => {
    const id = this.randomInteger(1011000, 1011400);
    this.onCharLoading();
    this.marvelService
      .getCharacter(id)
      .then((char) => {
        if (!char.description) {
          char.description = "Таких данных нет";
        }
        this.onCharLoaded(char);
      })
      .catch(this.onError);
  };

  render() {
    const { char, loading, error } = this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={char} /> : null;
    return (
      <div className="randomchar">
        {errorMessage}
        {spinner}
        {content}
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button className="button button__main" onClick={this.updateChar}>
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki } = char;
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
        style={
          thumbnail.includes("image_not_available")
            ? { objectFit: "contain" }
            : null
        }
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