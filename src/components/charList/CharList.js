import "./charList.scss";
import { Component } from "react/cjs/react.production.min";
import marvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner1";

class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    error: false,
  };

  marvelService = new marvelService();

  componentDidMount() {
    console.log("mount");
    this.marvelService
      .getAllCharacters()
      .then(this.onCharList)
      .catch(this.onError);
  }

  onCharList = (charList) => {
    this.setState(() => ({
      charList,
      loading: false,
    }));
  };

  onError = () => {
    this.setState({ error: true, loading: false });
  };

  renderItems = (arr) => {
    const items = arr.map((item) => {
      const imgStyle = item.thumbnail.includes("image_not_available")
        ? { objectFit: "unset" }
        : { objectFit: "cover" };
      return (
        <li
          className="char__item"
          key={item.id}
          onClick={() => this.props.onCharSelected(item.id)}
        >
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
    return <ul className="char__grid">{items}</ul>;
  };

  render() {
    const { charList, loading, error } = this.state;
    const items = this.renderItems(charList);
    const errorMessage = error ? <ErrorMessage /> : null;
    const loader = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;
    return (
      <div className="char__list">
        {errorMessage} {loader} {content}
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
