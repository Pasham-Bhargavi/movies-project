import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavStack from "./navigationStack/navStack";
import PremierContextProvider from "./context/premierContextProvider";

function App() {
  return (
    <PremierContextProvider>
      <Router>
        <NavStack />
      </Router>
    </PremierContextProvider>
  );
}

export default App;
