import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { Loader, Toast } from "./components";

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Toast />
      <Routes>
        {routes().map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Suspense>
  );
};

export default App;
