import "./SearchChar.scss";
import {
  Formik,
  Form,
  Field,
  ErrorMessage as FormikErrorMessage,
} from "formik";
import * as Yup from "yup";
import useMarvelService from "../../services/MarvelService";
import { useState } from "react";
import { Link } from "react-router-dom";
import ErrorMessage from "../errorMessage/ErrorMessage";

const SearchChar = () => {
  const [character, setCharacter] = useState(null);
  const [message, setMessage] = useState("");
  const { loading, error, getCharacterByName, clearError } = useMarvelService();
  const errorMessage = error ? <ErrorMessage /> : null;
  const results = !character ? (
    <div className="error">{message}</div>
  ) : character.length > 0 ? (
    <div className="success-block">
      <div className="success-block__success">{message}</div>
      <Link
        to={`/characters/${character[0].id}`}
        className="button button__secondary"
      >
        <div className="inner">TO PAGE</div>
      </Link>
    </div>
  ) : null;
  // console.log(character.length);
  console.log(results);
  return (
    <Formik
      initialValues={{
        charName: "",
      }}
      validationSchema={Yup.object({
        charName: Yup.string().required("Обязательное поле!"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        clearError();
        getCharacterByName(values.charName)
          .then((char) => {
            setCharacter(char);
            setMessage(`Персонаж ${char[0].name} найден`);
          })
          .catch((error) => {
            console.log(error.message);
            setCharacter(null);
            setMessage(error.message);
          })
          .finally(() => {
            setSubmitting(false);
          });
      }}
    >
      {(props) => (
        <Form className="searchchar">
          <div className="searchchar__title">Or find a character by name:</div>
          <div className="searchchar__container">
            <Field
              type="text"
              name="charName"
              id="charName"
              className="searchchar__input"
              placeholder="Enter name"
            />
            <button
              className="searchchar__button button button__main"
              type="submit"
              disabled={props.isSubmitting}
            >
              <div className="inner">FIND</div>
            </button>
          </div>
          <FormikErrorMessage
            className="error"
            name="charName"
            component="div"
          />
          {results}
          {errorMessage}
        </Form>
      )}
    </Formik>
  );
};

export default SearchChar;
