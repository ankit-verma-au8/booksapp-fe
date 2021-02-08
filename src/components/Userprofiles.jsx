import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Row, Container } from "react-bootstrap";
import { fetchuserProfile } from "../redux/actions/userActions";
import { Redirect } from "react-router-dom";

class Userprofiles extends Component {
  componentDidMount() {
    this.props.fetchuserProfile(this.props.match.params.id);
  }
  render() {
    return this.props.userforredirect ? (
      this.props.user ? (
        <div style={{ width: "80%" }}>
          <div style={{ marginTop: "40px" }} className="form-boxmain">
            <form onSubmit={this.handleSubmit} className="form-container">
              <Container>
                <table style={{ width: "100%" }}>
                  {this.props.responseFetchingState ? (
                    <div
                      style={{ position: "absolute", top: "40%", left: "45%" }}
                      className="lds-dual-ring"
                    ></div>
                  ) : null}
                  <div>
                    <span>Profile</span>
                  </div>
                  <Row>
                    <Col>
                      <div className="container">
                        <div className="img-holder">
                          <img
                            src={this.props.user.imagelink}
                            alt=""
                            id="img"
                            className="img"
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <tr>
                        <span className="profile-edit">
                          <div className="profile-block">
                            <td>
                              {" "}
                              <div className="profile-line">Name : </div>
                            </td>
                            <td>
                              <div className="profile-line1">
                                {this.props.user.name}
                              </div>
                            </td>
                          </div>
                        </span>
                      </tr>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <tr>
                        <span className="profile-edit">
                          <div className="profile-block">
                            <td>
                              {" "}
                              <div className="profile-line">Email : </div>
                            </td>
                            <td>
                              <div className="profile-line1">
                                {this.props.user.email}
                              </div>
                            </td>
                          </div>
                        </span>
                      </tr>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <tr>
                        <span className="profile-edit">
                          <div className="profile-block">
                            <td>
                              <div className="profile-line">Gender : </div>
                            </td>
                            <td>
                              <div className="profile-line1">
                                {this.props.user.gender}
                              </div>
                            </td>
                          </div>
                        </span>
                      </tr>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <tr>
                        <div className="profile-edit">
                          <div className="profile-block">
                            <td>
                              <div className="profile-line">Bio : </div>
                            </td>
                            <td>
                              <div className="profile-line1">
                                {this.props.user.bio}
                              </div>
                            </td>
                          </div>
                        </div>
                      </tr>
                    </Col>
                  </Row>
                </table>
              </Container>
            </form>
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )
    ) : (
      <Redirect to="/" />
    );
  }
}

const mapStatetoprops = (storeData) => {
  return {
    userforredirect: storeData.userState.user,
    user: storeData.userState.userProfile,
  };
};

export default connect(mapStatetoprops, { fetchuserProfile })(Userprofiles);
