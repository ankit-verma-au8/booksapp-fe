import React, { Component } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { updatePassword } from "../redux/actions/userActions";

class Resetpassword extends Component {
  state = {
    password: "",
    checkpassword: false,
  };
  handleValue = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handlepasswordSubmit = (e) => {
    this.setState({
      checkpassword: this.CheckPasswordfunc(this.state.password),
    });
    if (!this.CheckPasswordfunc(this.state.password)) {
      this.props.updatePassword({
        token: this.props.match.params.token,
        password: this.state.password,
      });
    }
  };
  CheckPasswordfunc = (inputtxt) => {
    var decimal = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (inputtxt.match(decimal)) {
      return false;
    } else {
      return true;
    }
  };

  render() {
    return (
      <div className="forgotcontainer">
        <Container>
          <Row>
            <Col>
              {this.props.isresfetching ? (
                <div
                  style={{
                    position: "absolute",
                    top: "30%",
                    left: "45%",
                    zIndex: "1",
                  }}
                  className="lds-dual-ring"
                ></div>
              ) : null}
              <div className="form-elements fori">
                <label htmlFor="password" style={{ color: "white" }}>
                  Password :{" "}
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={this.handleValue}
                  value={this.state.password}
                  className="form-inputs1"
                  placeholder="PLEASE ENTER THE NEW PASSWORD"
                />
                {this.state.checkpassword ? (
                  <p className="form-alert1">
                    Password must contain minimum eight characters, at least one
                    letter, one number and one special character!
                  </p>
                ) : null}
                {this.props.response ? (
                  <p style={{ color: "white" }}>
                    {this.props.response.message}
                  </p>
                ) : null}
                <button
                  onClick={this.handlepasswordSubmit}
                  className="form-button1"
                >
                  Submit
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStatetoprops = (storeData) => {
  return {
    response: storeData.userState.updatePasswordres,
    isresfetching: storeData.userState.isuserFetching,
  };
};
export default connect(mapStatetoprops, { updatePassword })(Resetpassword);
