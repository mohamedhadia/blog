import { useSelector } from "react-redux";
import "./App.css";
import { Blog } from "./Components/Blog";
import { Homepage } from "./Components/Homepage";
import Navbar from "./Components/Navbar";
import { selectSignedIn } from "./features/userSlice";

function App() {
  const isSignedin = useSelector(selectSignedIn);
  return (
    <div>
      <Navbar />
      <Homepage />
      {isSignedin && <Blog />}
    </div>
  );
}

export default App;
