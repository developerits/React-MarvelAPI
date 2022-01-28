import { lazy, Suspense } from "react";
import AppHeader from "../appHeader/AppHeader";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import SingleComicLayout from "../pages/singleComicLayout/singleComicLayout";
import SingleCharacterLayout from "../pages/singleCharacterLayout/singleCharacterLayout";
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const NoMatch = lazy(() => import("../pages/404"));
const SinglePage = lazy(() => import("../pages/SinglePage"));

// TODO  Кликабельный ссылочки комиксов у charinfo; несуществующая страницы - возвращаемся на страницу на которой был пользователь.

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/comics" element={<ComicsPage />} />
              <Route
                path="/characters/:id"
                element={
                  <SinglePage
                    Component={SingleCharacterLayout}
                    dataType={"character"}
                  />
                }
              />
              <Route
                path="/comics/:id"
                element={
                  <SinglePage
                    Component={SingleComicLayout}
                    dataType={"comic"}
                  />
                }
              />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
