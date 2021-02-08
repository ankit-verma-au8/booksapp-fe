import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css"
import Login from "./components/Login";
import Register from "./components/Register";
import Homepage from './components/Homepage'
import Profile from "./components/Profile";
import Library from "./components/Library";
import Header from './components/Header'
import Postpage from './components/Postpage'
import BookDetail from "./components/BookDetail";
import Social from "./components/Social";
import Modal from "react-modal";
import Userlibrary from "./components/Userlibrary";
import Userprofiles from "./components/Userprofiles";
import Forgot from "./components/Forgot";
import Resetpassword from './components/Resetpassword'

Modal.setAppElement("#root")

function App() {
  return (
    <div className="App">
      <div style={{width:"100%" }}>
        <Header />
      </div>
      <div style={{  display: "flex", justifyContent: "center",width:"100%" }}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={Homepage} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/library" component={Library} />
          <Route exact path="/home" component={Postpage} />
          <Route exact path="/social" component={Social} />
          <Route exact path="/forgot" component={Forgot} />
          <Route exact path="/resetpassword/:token" component={Resetpassword}/>
          <Route exact path="/bookdetail/:id" component={BookDetail} />
          <Route exact path="/userlibrary/:id" component={Userlibrary}/>
          <Route exact path="/userprofile/:id" component={Userprofiles}/>
          <Redirect to="/home" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
