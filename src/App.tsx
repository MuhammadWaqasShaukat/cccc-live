import { Route, Switch } from "wouter";
import "./App.css";
import Home from "./pages/Home";

function App() {
  return (
    <div className="overflow-x-hidden">
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
