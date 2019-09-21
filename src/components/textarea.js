import React from "react";
import styled from "styled-components";

const Textarea = styled.textarea`
  border: 1px solid #ccc;
  border-radius: 2px;
  padding: 10px;
  font-size: 14px;
  width: 100%;
  resize: none;
`;

export default class ResizableTextarea extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      rows: 2,
      minRows: 2,
      maxRows: 10
    };
  }

  handleChange = event => {
    const textareaLineHeight = 24;
    const { minRows, maxRows } = this.state;

    const previousRows = event.target.rows;
    event.target.rows = minRows; // reset number of rows in textarea

    const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }

    this.setState({
      value: event.target.value,
      rows: currentRows < maxRows ? currentRows : maxRows
    });
  };

  render() {
    return (
      <Textarea
        rows={this.state.rows}
        value={this.state.value}
        placeholder={this.props.placeholder}
        className={"textarea"}
        onChange={this.handleChange}
      />
    );
  }
}
