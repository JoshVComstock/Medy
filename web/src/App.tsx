import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./ThemeContext";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
        <ThemeProvider>
          <Routes />
        </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
