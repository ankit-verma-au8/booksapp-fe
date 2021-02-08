import React, { Component } from "react";
import Tilt from "react-tilt";
import "../styles/social.css";
import {
  getAllusers,
  deactivateuser,
  activateuser,
} from "../redux/actions/userActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Social extends Component {
  handleProfile = (id) => {
    this.props.history.push(`/userprofile/${id}`);
  };
  handleLibrary = (id) => {
    this.props.history.push(`/userlibrary/${id}`);
  };
  handledeactivate = (id) => {
    this.props.deactivateuser(id, window);
  };
  handleactivate = (id) => {
    this.props.activateuser(id, window);
  };
  componentDidMount() {
    this.props.getAllusers(this.props.history);
  }
  render() {
    return this.props.user ? (
      <div className="socialbody">
        <div className="containeri">
          {this.props.users ? (
            this.props.users.map((data) => (
              <Tilt
                options={{ max: 45, speed: 400, glare: true, "max-glare": 1 }}
              >
                <div className="cardi">
                  <div className="contenti">
                    <img
                      src={data.imagelink}
                      alt=""
                      width="100"
                      height="100"
                      className="socialimage"
                    />
                    <h3>{data.name}</h3>
                    <p>{data.email}</p>
                    <div className="userdetailbuttons">
                      <button
                        onClick={() => this.handleProfile(data._id)}
                        className="sociobutton"
                      >
                        Profile
                      </button>
                      <button
                        onClick={() => this.handleLibrary(data._id)}
                        className="sociobutton"
                      >
                        Library
                      </button>
                      {this.props.user.role.includes(2) ? (
                        data.isActive === "true" ? (
                          <button
                            onClick={() => this.handledeactivate(data._id)}
                          >
                            Deactivate
                          </button>
                        ) : (
                          <button onClick={() => this.handleactivate(data._id)}>
                            Activate
                          </button>
                        )
                      ) : null}
                    </div>
                  </div>
                </div>
              </Tilt>
            ))
          ) : (
            <h3>Loading...</h3>
          )}
        </div>
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}

const mapStatetoprops = (storeData) => {
  return {
    user: storeData.userState.user,
    isuserFetching: storeData.userState.isuserFetching,
    users: storeData.userState.allusers,
  };
};

export default connect(mapStatetoprops, {
  getAllusers,
  deactivateuser,
  activateuser,
})(Social);
