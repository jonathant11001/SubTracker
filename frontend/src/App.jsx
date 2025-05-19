import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import "./index.css";

function App() {
  const element = useRoutes(routes);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      {element}
    </Suspense>
  );
}

export default App;