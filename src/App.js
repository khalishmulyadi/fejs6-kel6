import { BrowserRouter } from "react-router-dom";
import RouterDefault from "./routerDefault/RouterDefault";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RouterDefault />
      </BrowserRouter>
    </div>
  );
}

export default App;
