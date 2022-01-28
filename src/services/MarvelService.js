import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const { request, clearError, process, setProcess } = useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "17d4b62232f28c49768f76f716bc85a6";
  const _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&apikey=${_apiKey}`
    );
    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?apikey=${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const getCharacterByName = (name) => {
    return new Promise(function (resolve, reject) {
      request(`${_apiBase}characters?name=${name}&apikey=${_apiKey}
      `).then((result) => {
        if (result.data.results.length) {
          resolve(result.data.results.map(_transformCharacter));
        } else {
          reject(new Error("Такого персонажа нет"));
        }
      });
    });
  };
  // const getCharacterByName = async (name) => {
  //   const res = await request(
  //     `${_apiBase}characters?name=${name}&apikey=${_apiKey}`
  //   );
  //   return _transformCharacter(res.data.results[0]);
  // };

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };

  const getComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?apikey=${_apiKey}`);
    return _transformComics(res.data.results[0]);
  };

  const getAllComics = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}comics?limit=8&offset=${offset}&apikey=${_apiKey}`
    );
    return res.data.results.map(_transformComics);
  };

  const _transformComics = (comic) => {
    return {
      id: comic.id,
      title: comic.title,
      description: comic.description || "There is no description",
      pageCount: comic.pageCount
        ? `${comic.pageCount} p.`
        : "No information about the number of pages",
      thumbnail: comic.thumbnail.path + "." + comic.thumbnail.extension,
      price: comic.prices[0].price,
      // homepage: comic.urls[0].url,
    };
  };

  return {
    getAllCharacters,
    getCharacter,
    getCharacterByName,
    clearError,
    process,
    getComic,
    getAllComics,
    setProcess,
  };
};

export default useMarvelService;
