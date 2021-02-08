import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setlibrary,
  getlibrary,
  getreadinglibrary,
  getwillreadinglibrary,
  deleteread,
  deletereading,
  fetchlibrary,
  deletewillread,
} from "../redux/actions/libraryAction";
import { Redirect } from "react-router-dom";
import Modal from "react-modal";
import { v4 as uuidv4 } from "uuid";
import "../styles/library.css";
import bookimagealt from "../images/read.jpg";

class Library extends Component {
  state = {
    books: "",
    bookstitle: null,
    readbook: false,
    readingbook: false,
    willreadingbook: false,
    readboolean: false,
  };
  componentDidMount() {
    this.props.fetchlibrary(this.props.history);
  }
  handleBooks = (e) => {
    this.setState({ books: e.target.value });
    this.props.setlibrary(this.state.books);
    this.setState({ bookstitle: this.props.bookstitle });
  };
  handleItems = (value) => {
    this.setState({ books: value, bookstitle: [] });
    this.setState({ readboolean: true });
  };
  handleSubmit = (e) => {
    let index1 = this.props.readbooks.findIndex(
      (x) => x.title === this.state.books
    );
    let index2 = this.props.readingbooks.findIndex(
      (x) => x.title === this.state.books
    );
    let index3 = this.props.willreadbooks.findIndex(
      (x) => x.title === this.state.books
    );
    if (index1 === -1 && index2 === -1 && index3 === -1) {
      this.props.getlibrary(this.state.books, this.props.allbooks);
      this.setState({ books: "", readbook: false });
      this.setState({ readboolean: false });
    } else {
      this.setState({ books: "", readbook: false });
      this.setState({ readboolean: false });
    }
  };
  handlereadingSubmit = (e) => {
    let index1 = this.props.readbooks.findIndex(
      (x) => x.title === this.state.books
    );
    let index2 = this.props.readingbooks.findIndex(
      (x) => x.title === this.state.books
    );
    let index3 = this.props.willreadbooks.findIndex(
      (x) => x.title === this.state.books
    );
    if (index1 === -1 && index2 === -1 && index3 === -1) {
      this.props.getreadinglibrary(this.state.books, this.props.allbooks);
      this.setState({ books: "", readingbook: false });
      this.setState({ readboolean: false });
    } else {
      this.setState({ books: "", readingbook: false });
      this.setState({ readboolean: false });
    }
  };
  handlewillreadingSubmit = (e) => {
    let index1 = this.props.readbooks.findIndex(
      (x) => x.title === this.state.books
    );
    let index2 = this.props.readingbooks.findIndex(
      (x) => x.title === this.state.books
    );
    let index3 = this.props.willreadbooks.findIndex(
      (x) => x.title === this.state.books
    );
    if (index1 === -1 && index2 === -1 && index3 === -1) {
      this.props.getwillreadinglibrary(this.state.books, this.props.allbooks);
      this.setState({ books: "", willreadingbook: false });
      this.setState({ readboolean: false });
    } else {
      this.setState({ books: "", willreadingbook: false });
      this.setState({ readboolean: false });
    }
  };
  handleBookdetail = (id) => {
    this.props.history.push(`/bookdetail/${id}`);
  };
  handlereaddelete = (id) => {
    this.props.deleteread(id);
  };
  handlereadingdelete = (id) => {
    this.props.deletereading(id);
  };
  handlewillreaddelete = (id) => {
    this.props.deletewillread(id);
  };

  
  render() {
    console.log(this.props.readbooks);
    return this.props.user ? (
      <div>
        {this.props.responseFetchingState ? (
          <div
            style={{ position: "absolute", top: "50%", left: "46%" }}
            className="lds-dual-ring"
          ></div>
        ) : null}
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
                      <button
                        onClick={() => this.handlereaddelete(data.bookId)}
                        className="bookbtn bkdbtn"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              : ""}
            <button
              onClick={() => this.setState({ readbook: true })}
              className="bookbtn"
            >
              Add Book
            </button>
            <Modal
              isOpen={this.state.readbook}
              onRequestClose={() => this.setState({ readbook: false })}
              className="readbookmodal"
              style={{
                overlay: {
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor:
                    'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),url("../images/login.jpg")',
                },
                content: {
                  position: "absolute",
                  top: "40px",
                  left: "40px",
                  right: "40px",
                  bottom: "40px",
                  border: "1px solid #ccc",
                  overflow: "auto",
                  WebkitOverflowScrolling: "touch",
                  borderRadius: "4px",
                  background:
                    "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8))",
                  padding: "20px",
                },
              }}
            >
              <div className="booksinput">
                <h1>Books Which You Read</h1>
                <div>
                  <input
                    type="text"
                    name="books"
                    value={this.state.books}
                    onChange={this.handleBooks}
                    placeholder="please enter your booktitle and select from the suggestion"
                  />
                  {this.state.readboolean ? (
                    <button onClick={this.handleSubmit} className="bookbtn">
                      Addbook
                    </button>
                  ) : (
                    ""
                  )}
                </div>
                <ul className="listitems">
                  {this.state.bookstitle
                    ? this.state.bookstitle.map((item) => (
                        <li
                          key={uuidv4()}
                          onClick={() => this.handleItems(item)}
                          className="listitemsitem"
                        >
                          {item}
                        </li>
                      ))
                    : ""}
                </ul>
              </div>
            </Modal>
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
                      <button
                        onClick={() => this.handlereadingdelete(data.bookId)}
                        className="bookbtn bkdbtn"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              : ""}
            <button
              onClick={() => this.setState({ readingbook: true })}
              className="bookbtn"
            >
              Add Book
            </button>
            <Modal
              isOpen={this.state.readingbook}
              onRequestClose={() => this.setState({ readingbook: false })}
              className="readbookmodal"
              style={{
                overlay: {
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor:
                    'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),url("../images/login.jpg")',
                },
                content: {
                  position: "absolute",
                  top: "40px",
                  left: "40px",
                  right: "40px",
                  bottom: "40px",
                  border: "1px solid #ccc",
                  overflow: "auto",
                  WebkitOverflowScrolling: "touch",
                  borderRadius: "4px",
                  background:
                    "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8))",
                  padding: "20px",
                },
              }}
            >
              <div className="booksinput">
                <h1>Books Which You are Reading</h1>
                <div>
                  <input
                    type="text"
                    name="books"
                    value={this.state.books}
                    onChange={this.handleBooks}
                    placeholder="please enter your booktitle and select from the suggestion"
                  />
                  {this.state.readboolean ? (
                    <button
                      onClick={this.handlereadingSubmit}
                      className="bookbtn"
                    >
                      Addbook
                    </button>
                  ) : (
                    ""
                  )}
                </div>
                <ul className="listitems">
                  {this.state.bookstitle
                    ? this.state.bookstitle.map((item) => (
                        <li
                          key={uuidv4()}
                          onClick={() => this.handleItems(item)}
                          className="listitemsitem"
                        >
                          {item}
                        </li>
                      ))
                    : ""}
                </ul>
              </div>
            </Modal>
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
                      <button
                        onClick={() => this.handlewillreaddelete(data.bookId)}
                        className="bookbtn bkdbtn"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              : ""}
            <button
              onClick={() => this.setState({ willreadingbook: true })}
              className="bookbtn"
            >
              Add Book
            </button>
            <Modal
              isOpen={this.state.willreadingbook}
              onRequestClose={() => this.setState({ willreadingbook: false })}
              className="readbookmodal"
              style={{
                overlay: {
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor:
                    'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),url("../images/login.jpg")',
                },
                content: {
                  position: "absolute",
                  top: "40px",
                  left: "40px",
                  right: "40px",
                  bottom: "40px",
                  border: "1px solid #ccc",
                  overflow: "auto",
                  WebkitOverflowScrolling: "touch",
                  borderRadius: "4px",
                  background:
                    "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8))",
                  padding: "20px",
                },
              }}
            >
              <div className="booksinput">
                <h1>Books Which You Want to Read</h1>
                <div>
                  <input
                    type="text"
                    name="books"
                    value={this.state.books}
                    onChange={this.handleBooks}
                    placeholder="please enter your booktitle and select from the suggestion"
                  />
                  {this.state.readboolean ? (
                    <button
                      onClick={this.handlewillreadingSubmit}
                      className="bookbtn"
                    >
                      Addbook
                    </button>
                  ) : (
                    ""
                  )}
                </div>
                <ul className="listitems">
                  {this.state.bookstitle
                    ? this.state.bookstitle.map((item) => (
                        <li
                          key={uuidv4()}
                          onClick={() => this.handleItems(item)}
                          className="listitemsitem"
                        >
                          {item}
                        </li>
                      ))
                    : ""}
                </ul>
              </div>
            </Modal>
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
    allbooks: storeData.libraryState.booksinfo,
    bookstitle: storeData.libraryState.bookstitle,
    readbooks: storeData.libraryState.readbooks,
    readingbooks: storeData.libraryState.readingbooks,
    willreadbooks: storeData.libraryState.willreadbooks,
    responseFetchingState: storeData.libraryState.isbookAdding,
  };
};
export default connect(mapStatetoprops, {
  setlibrary,
  getlibrary,
  getwillreadinglibrary,
  getreadinglibrary,
  deleteread,
  deletereading,
  deletewillread,
  fetchlibrary,
})(Library);
