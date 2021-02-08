import React from "react";
import "../styles/header.css";
import { Dropdown, Row, Container, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Utils from "../utils";
import { logoutUser, logoutAll } from "../redux/actions/userActions";

const Header = (props) => {
  const handleHome = () => {
    props.history.push("/home");
  };
  const handleclicklogin = () => {
    props.history.push("/login");
  };
  const handlelogout = () => {
    props.logoutUser();
  };
  const handlelogoutall = () => {
    props.logoutAll();
  };
  return (
    <div className="Header-Total">
      <Container>
        <Row>
          <Col lg={6} md={6} xs={6}>
            <div>
              <div className="Header-Title" onClick={handleHome}>
                <span className="Header-Logo">BooksApp</span>
                <span className="Header-Sublogo">
                  The place where you find your favouite books
                </span>
              </div>
            </div>
          </Col>
          <Col lg={6} md={6} xs={6}>
            {!props.user ? (
              <div className="User-logo">
                {console.log(props.user)}
                <Button
                  onClick={handleclicklogin}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "white",
                    color: "rgb(40, 116, 240)",
                    border: "none",
                    fontWeight: "800",
                    fontSize: "1.2rem",
                  }}
                  className="dropdown"
                  color="primary"
                >
                  Login
                </Button>
              </div>
            ) : (
              <div className="User-logo">
                {console.log(props.user)}
                <Dropdown>
                  <Dropdown.Toggle className="User-button">
                    <img
                      className="User-image"
                      src={props.user.imagelink}
                      alt="demo"
                    />
                    <span className="User-name">
                      {Utils.limitDescription(props.user.name, 5)}
                    </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="User-dropdown">
                    <Dropdown.Item>
                      <Link to="/profile" className="form-links1">
                        Profile
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link to="/library" className="form-links1">
                        Library
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link
                        id="RouterNavLink"
                        to="/social"
                        className="form-links1"
                      >
                        Social
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handlelogout}>
                      <Link to="/" className="form-links1">
                        <span style={{ color: "#FF0000" }}>Logout</span>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handlelogoutall}>
                      <Link to="/" className="form-links1">
                        <span style={{ color: "	#8B0000" }}>Logout all</span>
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStatetoprops = (storeData) => {
  return {
    user: storeData.userState.user,
  };
};
export default connect(mapStatetoprops, { logoutUser, logoutAll })(
  withRouter(Header)
);
