import "./styles.css"
import Login from "./components/login";
import Register from "./components/register";
import Motivation from "./components/motivation";
import { 
  BrowserRouter,
  Switch,
  Route
 } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path="/" exact component={Home} /> */}
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/tips" exact component={Motivation} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
