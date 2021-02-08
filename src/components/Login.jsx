import React, { Component } from "react";
import { Col, Alert, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/login.css";
import { loginUser, logoutUser } from "../redux/actions/userActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
class Login extends Component {
  state = {
    password: "",
    email: "",
    isChecked: true,
  };
  handleValue = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    const { isChecked } = this.state;
    localStorage.setItem("rememberMe", isChecked);
    localStorage.setItem("ruser", isChecked ? JSON.stringify(user) : "");
    this.props.loginUser(user, this.props.history);
  };
  toggleChange = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  };
  componentDidMount() {
    this.props.logoutUser();
    const rememberMe = localStorage.getItem("rememberMe") === "true";
    const user = rememberMe ? localStorage.getItem("ruser") : "";
    if (user) {
      let userobj = JSON.parse(user);
      this.setState({
        email: userobj.email,
        isChecked: rememberMe,
        password: userobj.password,
      });
    }
  }
  render() {
    return (
      <div style={{ width: "80%", marginTop: "5rem" }} className="Loginpage">
        <div className="form-boxmain">
          <form onSubmit={this.handleSubmit} className="form-container">
            <Container>
              {this.props.responseFetchingState ? (
                <div
                  style={{ position: "absolute", top: "50%", left: "47%" }}
                  className="lds-dual-ring"
                ></div>
              ) : null}
              <div>
                <span>Login</span>
              </div>
              <Row>
                <Col>
                  <div className="form-elements">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      onChange={this.handleValue}
                      value={this.state.email}
                      className="form-inputs"
                      placeholder="please enter the email"
                    />
                  </div>
                </Col>
              </Row>
              {this.props.response ? (
                this.props.response.error ? (
                  this.props.response.error.errors ? (
                    this.props.response.error.errors.email ? (
                      <Alert color="secondary">
                        {this.props.response.error.errors.email.msg}
                      </Alert>
                    ) : null
                  ) : null
                ) : null
              ) : null}
              <Row>
                <Col>
                  <div className="form-elements">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      onChange={this.handleValue}
                      value={this.state.password}
                      className="form-inputs"
                      placeholder="please enter the password"
                    />
                  </div>
                </Col>
              </Row>
              {this.props.response ? (
                this.props.response.error ? (
                  this.props.response.error.errors ? (
                    this.props.response.error.errors.password ? (
                      <Alert color="secondary">
                        {this.props.response.error.errors.password.msg}
                      </Alert>
                    ) : null
                  ) : null
                ) : null
              ) : null}
              <Row>
                <Col>
                  <div className="form-box">
                    <input
                      type="checkbox"
                      className="check-box"
                      checked={this.state.isChecked}
                      onChange={this.toggleChange}
                    />
                    <span className="form-checkbox">Remember Me</span>
                  </div>
                </Col>
              </Row>
              <Row className="form-parentlink">
                <Col lg={6} md={6}>
                  <Link to="/Register" className="form-links">
                    New User ?
                  </Link>
                </Col>
                <Col lg={6} md={6}>
                  <Link to="/forgot" className="form-links">
                    Forgot Password ?
                  </Link>
                </Col>
              </Row>
              <Row>
                <Col>
                  <button type="submit" className="form-button">
                    Login
                  </button>
                </Col>
                {/* <Col>
                                    <button className="form-button"><i class="fa fa-google" aria-hidden="true"></i> Google</button>
                                </Col> */}
              </Row>
              {this.props.response ? (
                this.props.response.error ? (
                  <Alert color="secondary">
                    {this.props.response.error.message}
                  </Alert>
                ) : null
              ) : null}
              {this.props.response ? (
                <Alert color="secondary">{this.props.response.message}</Alert>
              ) : null}
            </Container>
          </form>
        </div>
      </div>
    );
  }
}

const mapStatetoprops = (storeData) => {
  return {
    responseFetchingState: storeData.userState.isuserFetching,
    response: storeData.userState.userResponse,
  };
};

export default connect(mapStatetoprops, { loginUser, logoutUser })(
  withRouter(Login)
);
