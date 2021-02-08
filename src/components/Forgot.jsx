import React, { Component } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { sendresetpasswordRequest } from "../redux/actions/userActions";

class Forgot extends Component {
  state = {
    email: "",
  };
  handleValue = (e) => {
    this.setState({ email: e.target.value });
  };
  handleregisterSubmit = (e) => {
    this.props.sendresetpasswordRequest(this.state.email);
    this.setState({ email: "" });
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
                <label htmlFor="email" style={{ color: "white" }}>
                  Email :{" "}
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={this.handleValue}
                  value={this.state.email}
                  className="form-inputs1"
                  placeholder="PLEASE ENTER THE REGISTERED EMAIL TO CHANGE PASSWORD"
                />
                {this.props.response ? (
                  <p style={{ color: "white" }}>
                    {this.props.response.message}
                  </p>
                ) : null}

                <button
                  onClick={this.handleregisterSubmit}
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
    response: storeData.userState.resetPasswordres,
    isresfetching: storeData.userState.isuserFetching,
  };
};
export default connect(mapStatetoprops, { sendresetpasswordRequest })(Forgot);
