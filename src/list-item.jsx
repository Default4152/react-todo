var React = require('react');
var Firebase = require('firebase');
var rootUrl = 'https://todolistreact.firebaseio.com/';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      text: this.props.item.text,
      done: this.props.item.done,
      textChanged: false
    }
  },
  componentWillMount: function() {
    this.fb = new Firebase(rootUrl + 'items/' + this.props.item.key);
  },
  render: function() {
    return (
      <div className="input-group">
        <span className="input-group-addon">
          <input
            type="checkbox"
            checked={this.state.done}
            onChange={this.handleDoneChange} />
        </span>
        <input type="text"
          disabled={this.state.done}
          className="form-control"
          value={this.state.text}
          onChange={this.handleTextChange}
          />
        <span className="input-group-btn">
        {this.changesButtons()}
          <button
            className="btn btn-danger"
            onClick={this.handleDeleteClick}
            >
            Delete
          </button>
        </span>
      </div>
    )
  },
  changesButtons: function() {
    if(!this.state.textChanged) {
      return null;
    } else {
      return [
        <button
          onClick={this.handleSaveClick}
          className="btn btn-default">
          Save
        </button>,
        <button
          onClick={this.handleUndoClick}
          className="btn btn-default">
          Undo
        </button>
      ]
    }
  },
  handleUndoClick: function(e) {
    this.setState({
      text: this.props.item.text,
      textChanged: false
    });
  },
  handleDoneChange: function(e) {
    var update = {
      done: e.target.checked
    };
    this.setState(update);
    this.fb.update(update);
  },
  handleDeleteClick: function(e) {
    this.fb.remove();
  },
  handleTextChange: function(e) {
    this.setState({
      text: e.target.value,
      textChanged: true
    });
  },
  handleSaveClick: function() {
    this.fb.update({text: this.state.text});
    this.setState({textChanged: false});
  }
});
