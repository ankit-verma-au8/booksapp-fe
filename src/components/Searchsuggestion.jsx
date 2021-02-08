import React from "react";
import "../styles/Searchsuggestion.css";
import axios from "axios";
import { setBookinfo } from "../redux/actions/Postactions";
import { connect } from "react-redux";
import utills from "../utils";
class Searchsuggestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      suggestions: [],
      text: "",
    };
  }

  onTextChanged = async (e) => {
    const value = e.target.value;
    this.setState(() => ({ text: value }));
    let suggestions = [];
    if (value.length > 0) {
      const { data } = await axios(
        `https://www.googleapis.com/books/v1/volumes?q=${value}`
      );
      console.log(data);
      const dataArray = data.items;
      for (let i = 0; i < 3; i++) {
        suggestions.push({
          _id: dataArray[i].id,
          title: dataArray[i].volumeInfo.title,
        });
      }
    }
    this.setState(() => ({ suggestions }));
  };

  suggestionSelected(value) {
    this.setState(() => ({
      text: value.title,
      suggestions: [],
    }));
    this.props.setBookinfo(value);
  }

  renderSuggestions() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <div className="srchList">
        <ul className="suggestion_ul">
          {suggestions.map((item) => (
            <li
              style={{ cursor: "pointer" }}
              onClick={() => this.suggestionSelected(item)}
            >
              {utills.limitDescription(item.title, 35)}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    const { text } = this.state;
    return (
      <div className="modalinputdiv">
        <input
          className="search_input"
          value={text}
          onChange={this.onTextChanged}
          type="text"
          placeholder="Search"
        />

        {this.renderSuggestions()}
      </div>
    );
  }
}

export default connect(null, { setBookinfo })(Searchsuggestion);
