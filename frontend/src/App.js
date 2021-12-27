import "./styles.css"
import Login from "./components/login";
import Register from "./components/register";
import Motivation from "./components/motivation";
import Test from "./components/test";
import Logout from "./components/logout"
import 'react-toastify/dist/ReactToastify.css';
import { 
  BrowserRouter,
  Switch,
  Route
 } from 'react-router-dom'
 require('dotenv').config()

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path="/" exact component={Home} /> */}
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/tips" exact component={Motivation} />
        <Route path="/test" exact component={Test} />
        <Route path="/logout" exact component={Logout} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
