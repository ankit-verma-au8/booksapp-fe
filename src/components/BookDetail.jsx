import React, { Component } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "../styles/book.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class BookDetail extends Component {
  state = {
    bookinfo: "",
  };
  async componentDidMount() {
    const { data } = await axios(
      `https://www.googleapis.com/books/v1/volumes/${this.props.match.params.id}`
    );
    this.setState({ bookinfo: data.volumeInfo });
  }
  render() {
    return this.props.user ? (
      <div className="bookdetailstyle">
        <div className="bookdetailindi">
          <div className="booktitle">{this.state.bookinfo.title}</div>
          <div>
            {this.state.bookinfo.imageLinks ? (
              <img
                className="bookimage"
                src={this.state.bookinfo.imageLinks.thumbnail}
                alt="bookimage"
                width="300"
                height="300"
              />
            ) : (
              ""
            )}
          </div>
          <div className="bookinfotable">
            <table style={{ width: "100%" }}>
              <tr>
                <td>
                  <b>Author :</b>
                </td>
                <td>
                  {this.state.bookinfo.authors
                    ? this.state.bookinfo.authors.map((data) => (
                        <span key={uuidv4()}>{data}</span>
                      ))
                    : "anonymous"}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Publisher :</b>
                </td>
                <td>
                  {this.state.bookinfo.publisher
                    ? this.state.bookinfo.publisher
                    : "unknown"}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Published Date :</b>
                </td>
                <td>
                  {this.state.bookinfo.publishedDater
                    ? this.state.bookinfo.publishedDater
                    : "unknown"}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Description :</b>
                </td>
                <td>
                  {this.state.bookinfo.description
                    ? this.state.bookinfo.description
                    : "unknown"}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Pages :</b>
                </td>
                <td>
                  {this.state.bookinfo.pageCount
                    ? this.state.bookinfo.pageCount
                    : "unknown"}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Rating :</b>
                </td>
                <td>
                  {this.state.bookinfo.averageRating
                    ? this.state.bookinfo.averageRating
                    : "unknown"}
                </td>
              </tr>
            </table>
          </div>
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
  };
};

export default connect(mapStatetoprops)(BookDetail);
