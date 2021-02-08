import React, { Component } from "react";
import { Col, Row, Container } from "react-bootstrap";
import "../styles/profile.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getuserDetail,
  uploadPicture,
  editProfile,
} from "../redux/actions/userActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Profile extends Component {
  state = {
    name: "name",
    email: "email@something.com",
    gender: "",
    bio: "You are cool",
    nameedit: true,
    emailedit: true,
    ageedit: true,
    bioedit: true,
    edit: false,
    profileImg: "https://i.ibb.co/gSbgf9K/male-placeholder.jpg",
  };
  async componentDidMount() {
    await this.props.getuserDetail(this.props.history);
    if (this.props.userDetail) {
      const { name, email, gender, bio, imagelink } = this.props.userDetail;

      this.setState({ name, email, gender, bio, profileImg: imagelink });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.dpResponse) {
      if (prevProps.dpResponse !== this.props.dpResponse) {
        if (this.props.dpResponse.success) {
          toast.success("DP updated successfully!", { autoClose: 2000 });
        }
      }
    }
    if (this.props.updateResponse) {
      if (prevProps.updateResponse !== this.props.updateResponse) {
        if (this.props.updateResponse.success) {
          toast.success("Profile updated successfully!", { autoClose: 2000 });
        }
      }
    }
  }
  handleproEdit = (e) => {
    e.preventDefault();
    this.setState({ edit: true });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      edit: false,
      nameedit: true,
      emailedit: true,
      ageedit: true,
      bioedit: true,
    });
    const picture = {
      imageData: this.state.profileImg,
    };
    this.props.uploadPicture(picture);
    this.props.editProfile({
      name: this.state.name,
      gender: this.state.gender,
      bio: this.state.bio,
    });
  };
  imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({ profileImg: reader.result });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  handlenameEdit = (e) => {
    this.setState({ nameedit: !this.state.nameedit });
  };
  handlenameDown = (e) => {
    if (e.key === "Enter") {
      this.setState({ nameedit: !this.state.nameedit });
    }
  };
  handleemailEdit = (e) => {
    this.setState({ emailedit: !this.state.emailedit });
  };
  handleemailDown = (e) => {
    if (e.key === "Enter") {
      this.setState({ emailedit: !this.state.emailedit });
    }
  };
  handleageEdit = (e) => {
    this.setState({ ageedit: !this.state.ageedit });
  };
  handleageDown = (e) => {
    if (e.key === "Enter") {
      this.setState({ ageedit: !this.state.ageedit });
    }
  };
  handleageEdit = (e) => {
    this.setState({ ageedit: !this.state.ageedit });
  };
  handleageDown = (e) => {
    if (e.key === "Enter") {
      this.setState({ ageedit: !this.state.ageedit });
    }
  };
  handlebioEdit = (e) => {
    this.setState({ bioedit: !this.state.bioedit });
  };
  handlebioDown = (e) => {
    if (e.key === "Enter") {
      this.setState({ bioedit: !this.state.bioedit });
    }
  };
  handleValue = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return this.props.user ? (
      <div style={{ overflow: "auto", width: "80%" }}>
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
                          src={this.state.profileImg}
                          alt=""
                          id="img"
                          className="img"
                        />
                      </div>
                      {this.state.edit ? (
                        <>
                          <input
                            type="file"
                            accept="image/*"
                            name="image-upload"
                            id="input"
                            onChange={this.imageHandler}
                          />
                          <div className="label">
                            <label className="image-upload" htmlFor="input">
                              <i class="fas fa-image"></i>&nbsp;Choose your
                              Photo
                            </label>
                          </div>
                        </>
                      ) : null}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {this.state.nameedit ? (
                      <tr>
                        <div>
                          <span className="profile-edit">
                            <div className="profile-block">
                              <td>
                                {" "}
                                <div className="profile-line">Name : </div>
                              </td>
                              <td>
                                <div className="profile-line1">
                                  {this.state.name}
                                </div>
                              </td>
                              <td>
                                {this.state.edit ? (
                                  <div className="profile-line">
                                    <i
                                      className="fas fa-edit"
                                      onClick={this.handlenameEdit}
                                      name="nameedit"
                                    ></i>
                                  </div>
                                ) : null}
                              </td>
                            </div>
                          </span>
                        </div>
                      </tr>
                    ) : (
                      <div className="form-elements">
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          name="name"
                          onChange={this.handleValue}
                          value={this.state.name}
                          className="form-inputs"
                          placeholder="please enter your Name"
                          onKeyDown={this.handlenameDown}
                        />
                      </div>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {this.state.emailedit ? (
                      <tr>
                        <div>
                          <span className="profile-edit">
                            <div className="profile-block">
                              <td>
                                {" "}
                                <div className="profile-line">Email : </div>
                              </td>
                              <td>
                                <div className="profile-line1">
                                  {this.state.email}
                                </div>
                              </td>
                              <td>
                                {this.state.edit ? (
                                  <div className="profile-line">
                                    <i
                                      className="fas fa-edit"
                                      onClick={this.handleemailEdit}
                                      name="emailedit"
                                    ></i>
                                  </div>
                                ) : null}
                              </td>
                            </div>
                          </span>
                        </div>
                      </tr>
                    ) : (
                      <div className="form-elements">
                        <label htmlFor="name">Email</label>
                        <input
                          type="text"
                          name="email"
                          onChange={this.handleValue}
                          value={this.state.email}
                          className="form-inputs"
                          placeholder="please enter your Name"
                          onKeyDown={this.handleemailDown}
                        />
                      </div>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {this.state.ageedit ? (
                      <tr>
                        <div>
                          <span className="profile-edit">
                            <div className="profile-block">
                              <td>
                                <div className="profile-line">Gender : </div>
                              </td>
                              <td>
                                <div className="profile-line1">
                                  {this.state.gender}
                                </div>
                              </td>
                              <td>
                                {this.state.edit ? (
                                  <div className="profile-line">
                                    <i
                                      className="fas fa-edit"
                                      onClick={this.handleageEdit}
                                      name="ageedit"
                                    ></i>
                                  </div>
                                ) : null}
                              </td>
                            </div>
                          </span>
                        </div>
                      </tr>
                    ) : (
                      <div className="form-elements">
                        <label htmlFor="name">Gender</label>
                        <input
                          type="text"
                          name="gender"
                          onChange={this.handleValue}
                          value={this.state.gender}
                          className="form-inputs"
                          placeholder="please enter your gender"
                          onKeyDown={this.handleageDown}
                        />
                      </div>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {this.state.bioedit ? (
                      <tr>
                        <div>
                          <div className="profile-edit">
                            <div className="profile-block">
                              <td>
                                <div className="profile-line">Bio : </div>
                              </td>
                              <td>
                                <div className="profile-line1">
                                  {this.state.bio}
                                </div>
                              </td>
                              <td>
                                {this.state.edit ? (
                                  <div className="profile-line">
                                    <i
                                      className="fas fa-edit"
                                      onClick={this.handlebioEdit}
                                      name="bioedit"
                                    ></i>
                                  </div>
                                ) : null}
                              </td>
                            </div>
                          </div>
                        </div>
                      </tr>
                    ) : (
                      <div className="form-elements">
                        <label htmlFor="name">Bio</label>
                        <textarea
                          name="bio"
                          onChange={this.handleValue}
                          value={this.state.bio}
                          className="form-inputbio"
                          placeholder="please enter your Name"
                          onKeyDown={this.handlebioDown}
                          wrap="soft"
                          maxLength="150"
                        />
                      </div>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <button
                      type="submit"
                      onSubmit={this.handleSubmit}
                      className="form-button"
                    >
                      Save
                    </button>
                  </Col>
                  <Col>
                    <button
                      className="form-button"
                      onClick={this.handleproEdit}
                    >
                      Edit Profile
                    </button>
                  </Col>
                </Row>
              </table>
            </Container>
          </form>
        </div>
        <ToastContainer />
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}
const mapstatetoprops = (storeData) => {
  return {
    user: storeData.userState.user,
    userDetail: storeData.userState.userDetail,
    dpResponse: storeData.userState.dpresponse,
    updateResponse: storeData.userState.updateResponse,
  };
};

export default connect(mapstatetoprops, {
  uploadPicture,
  getuserDetail,
  editProfile,
})(Profile);
