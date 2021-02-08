import React, { Component } from "react";
import { Col, Alert, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/login.css";
import { registerUser, removeResponse } from "../redux/actions/userActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Register extends Component {
  state = {
    name: "",
    password: "",
    cpassword: "",
    email: "",
    gender: "",
    role: "",
    passcode: "",
    checkpassword: false,
    checkemail: false,
    checkpasswordmatch: false,
    checkname: false,
  };
  CheckPasswordfunc = (inputtxt) => {
    var decimal = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (inputtxt.match(decimal)) {
      return false;
    } else {
      return true;
    }
  };
  CheckPasswordmatchfunc = (p1, p2) => {
    if (p1 === p2) {
      return false;
    } else {
      return true;
    }
  };
  ValidateEmail = (inputText) => {
    var atposition = inputText.indexOf("@");
    var dotposition = inputText.lastIndexOf(".");
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (
      inputText.match(mailformat) &&
      !(
        atposition < 1 ||
        dotposition < atposition + 2 ||
        dotposition + 2 >= inputText.length
      )
    ) {
      return false;
    } else {
      return true;
    }
  };

  handleValue = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.removeResponse();
    this.setState({
      checkpassword: this.CheckPasswordfunc(this.state.password),
    });
    this.setState({ checkemail: this.ValidateEmail(this.state.email) });
    this.setState({
      checkpasswordmatch: this.CheckPasswordmatchfunc(
        this.state.password,
        this.state.cpassword
      ),
    });
    this.setState({ checkname: this.state.name.length > 3 ? false : true });
    if (
      !this.CheckPasswordfunc(this.state.password) &&
      !this.ValidateEmail(this.state.email) &&
      !this.CheckPasswordmatchfunc(this.state.password, this.state.cpassword) &&
      this.state.name.length > 0
    ) {
      const {
        name,
        email,
        password,
        cpassword,
        gender,
        role,
        passcode,
      } = this.state;
      const user = {
        name,
        email,
        password,
        confirmPassword: cpassword,
        gender: gender || "male",
        role: role || "user",
        passcode,
      };
      this.props.registerUser(user, this.props.history);
    }
  };
  render() {
    return (
      <div style={{ width: "100%" }}>
        <div style={{ marginTop: "30px" }} className="form-boxmain">
          <form onSubmit={this.handleSubmit} className="form-container">
            <Container>
              {this.props.responseFetchingState ? (
                <div
                  style={{ position: "absolute", top: "50%", left: "46%" }}
                  className="lds-dual-ring"
                ></div>
              ) : null}
              <div>
                <span>Register</span>
              </div>
              <Row>
                <Col>
                  <div className="form-elements">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="name"
                      onChange={this.handleValue}
                      value={this.state.name}
                      className="form-inputs"
                    />
                    {this.state.checkname ? (
                      <span className="form-alert">
                        Name must be atleast three characters
                      </span>
                    ) : null}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="form-elements">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      name="email"
                      onChange={this.handleValue}
                      value={this.state.email}
                      className="form-inputs"
                    />
                    {this.state.checkemail ? (
                      <span className="form-alert">
                        please enter a valid email
                      </span>
                    ) : null}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={6} md={6}>
                  <div className="form-elements">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      onChange={this.handleValue}
                      value={this.state.password}
                      className="form-inputs"
                    />
                    {this.state.checkpassword ? (
                      <span className="form-alert">
                        Password must contain minimum eight characters, at least
                        one letter, one number and one special character!
                      </span>
                    ) : null}
                  </div>
                </Col>
                <Col lg={6} md={6}>
                  <div className="form-elements">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input
                      type="password"
                      name="cpassword"
                      onChange={this.handleValue}
                      value={this.state.cpassword}
                      className="form-inputs"
                    />
                    {this.state.checkpasswordmatch ? (
                      <span className="form-alert">
                        password does not match
                      </span>
                    ) : null}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={6} md={6}>
                  <div className="form-elements">
                    <label htmlFor="gender">Please pick your gender </label>
                    <select
                      value={this.state.gender}
                      onChange={this.handleValue}
                      name="gender"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">other</option>
                    </select>
                  </div>
                </Col>
                <Col lg={6} md={6}>
                  <div className="form-elements">
                    <label htmlFor="role">Please pick your role </label>
                    <select
                      value={this.state.role}
                      onChange={this.handleValue}
                      name="role"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </Col>
              </Row>
              {this.state.role === "admin" ? (
                <Row>
                  <Col>
                    <div className="form-elements">
                      <label htmlFor="passcode">Passcode</label>
                      <input
                        type="text"
                        name="passcode"
                        onChange={this.handleValue}
                        value={this.state.passcode}
                        className="form-inputs"
                      />
                    </div>
                  </Col>
                </Row>
              ) : null}
              <Row className="form-parentlink">
                <Col>
                  <Link to="/login" className="form-links">
                    Already Registered ?
                  </Link>
                </Col>
              </Row>
              <Row>
                <Col>
                  <button type="submit" className="form-button">
                    Register
                  </button>
                </Col>
              </Row>
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
    responseFetchingState: storeData.userState.isResponseFetching,
    response: storeData.userState.userResponse,
  };
};
export default connect(mapStatetoprops, { registerUser, removeResponse })(
  withRouter(Register)
);
