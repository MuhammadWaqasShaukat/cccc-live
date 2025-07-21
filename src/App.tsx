import { Route, Switch } from "wouter";
import "./App.css";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import SnakeLoader from "./components/UI/SnakeLoader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.addEventListener("load", () => {
      setLoading(false);
    });
  }, []);

  if (loading) return <SnakeLoader />;

  return (
    <div className="overflow-x-hidden">
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
