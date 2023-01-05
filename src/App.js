import "./App.css";

import Router from "./Router"; 
import useFirebase from "./hooks/firebase";

// import { HomeView } from "./views/home/home";

function App() {
  useFirebase();
  return <Router />;
}

export default App;
