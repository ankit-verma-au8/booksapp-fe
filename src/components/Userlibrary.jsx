import React, { Component } from "react";
import { connect } from "react-redux";
import bookimagealt from "../images/read.jpg";
import { v4 as uuidv4 } from "uuid";
import { getuserLibrary } from "../redux/actions/libraryAction";
import { Redirect } from "react-router-dom";

class Userlibrary extends Component {
  componentDidMount() {
    this.props.getuserLibrary(this.props.match.params.id);
  }
  handleBookdetail = (id) => {
    this.props.history.push(`/bookdetail/${id}`);
  };
  render() {
    return this.props.user ? (
      <div>
        {/* <h2 style={{ color: "white", margin: "10px 0", textAlign: "center" }}>
          Ankit Kumar Verma
        </h2> */}
        <div className="alltasks">
          <div className="inditask reading">
            <span className="library-heading">ALREADY READ</span>
            {this.props.readbooks
              ? this.props.readbooks.map((data) => (
                  <div key={uuidv4()} className="planned">
                    <div className="bkimg">
                      {data.image ? (
                        <img src={data.image} alt="bookimage" className="buk" />
                      ) : (
                        <img
                          src={bookimagealt}
                          alt="unknowimg"
                          className="buk"
                        />
                      )}
                    </div>
                    <div className="bkimg bkt">{data.title}</div>
                    <div className="bkimg">
                      <button
                        onClick={() => this.handleBookdetail(data.bookId)}
                        className="bookbtn bkvbtn"
                      >
                        View Book
                      </button>
                    </div>
                  </div>
                ))
              : ""}
          </div>
          <div className="inditask reading">
            <span className="library-heading">CURRENTLY READING</span>
            {this.props.readingbooks
              ? this.props.readingbooks.map((data) => (
                  <div key={uuidv4()} className="planned">
                    <div className="bkimg">
                      {data.image ? (
                        <img src={data.image} alt="bookimage" className="buk" />
                      ) : (
                        <img
                          src={bookimagealt}
                          alt="unknowimg"
                          className="buk"
                        />
                      )}
                    </div>
                    <div className="bkimg bkt">{data.title}</div>
                    <div className="bkimg">
                      <button
                        onClick={() => this.handleBookdetail(data.bookId)}
                        className="bookbtn bkvbtn"
                      >
                        View Book
                      </button>
                    </div>
                  </div>
                ))
              : ""}
          </div>
          <div className="inditask reading">
            <span className="library-heading">WANT TO READ</span>
            {this.props.willreadbooks
              ? this.props.willreadbooks.map((data) => (
                  <div key={uuidv4()} className="planned">
                    <div className="bkimg">
                      {data.image ? (
                        <img src={data.image} alt="bookimage" className="buk" />
                      ) : (
                        <img
                          src={bookimagealt}
                          alt="unknowimg"
                          className="buk"
                        />
                      )}
                    </div>
                    <div className="bkimg bkt">{data.title}</div>
                    <div className="bkimg">
                      <button
                        onClick={() => this.handleBookdetail(data.bookId)}
                        className="bookbtn bkvbtn"
                      >
                        View Book
                      </button>
                    </div>
                  </div>
                ))
              : ""}
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
    readbooks: storeData.libraryState.readbooks,
    readingbooks: storeData.libraryState.readingbooks,
    willreadbooks: storeData.libraryState.willreadbooks,
    responseFetchingState: storeData.libraryState.isbookAdding,
  };
};
export default connect(mapStatetoprops, { getuserLibrary })(Userlibrary);
