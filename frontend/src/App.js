import "./styles.css"
import Login from "./components/login";
import Register from "./components/register";
import Motivation from "./components/motivation";
import Test from "./components/test";
import Logout from "./components/logout"
import Home from "./components/home"
import Low from "./components/low";
import Medium from "./components/medium";
import Good from "./components/good";
import 'react-toastify/dist/ReactToastify.css';
import { 
  BrowserRouter,
  Switch,
  Route
 } from 'react-router-dom'
 const dotenv= require('dotenv')

function App() {
  const res = dotenv.config()
  console.log("DotENv: ",res);
  console.log("DotENv err: ",res.error);
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/tips" exact component={Motivation} />
        <Route path="/test" exact component={Test} />
        <Route path="/low" exact component={Low} />
        <Route path="/medium" exact component={Medium} />
        <Route path="/good" exact component={Good} />
        <Route path="/logout" exact component={Logout} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
