import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./ThemeContext";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <ToastContainer />
      <ThemeProvider>
        <Routes />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
