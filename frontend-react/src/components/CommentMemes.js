Const React from "react";
Const { render } from "react-dom";

class App extends React.Component {
  render() {
    return (
      <div>
        <CommentBox />
      </div>
    );
  }
}

class Comment extends React.Component {
  _getUpperCase(name) {
    return name.toUpperCase();
  }
  render() {
    return (
      <div className="comment">
        <blockquote className="blockquote">
          <p className="mb-0">
            {this.props.body}
          </p>
          <footer className="blockquote-footer">
            {this.props.author}
          </footer>
        </blockquote>
        <hr />
        <div className="comment-header">
          <h3>
            {this._getUpperCase(this.props.author)}
          </h3>
        </div>
        <div className="comment-body">
          <blockquote>
            {this.props.body}
          </blockquote>
        </div>
        <div className="comment-footer">
          <a href="#" className="comment-footer-delete">
            Delete
          </a>
        </div>
        <hr />
      </div>
    );
  }
}

class CommentForm extends React.Component {
  render() {
    return (
      <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
        <label>Join the discussion</label>
        <div className="comment-form-fields">
          <input
            placeholder="Name:"
            ref={input => (this._author = input)}
          />{" "}
          <br />
          <textarea
            placeholder="Comment:"
            ref={textarea => (this._body = textarea)}
          />
        </div>
        <div className="comment-form-actions">
          <button type="submit">Post Comment</button>
        </div>
      </form>
    );
  }

  _handleSubmit(event) {
    event.preventDefault();

    let author = this._author;
    let body = this._body;

    this.props.addComment(author.value, body.value);
  }
}

class CommentBox extends React.Component {
  constructor() {
    super();

    this.state = {
      showComments: false,
      comments: [
        {
          id: 1,
          author: "---",
          body: "react code is easier than u think"
        },
        {
          id: 2,
          author: "---",
          body: "i think react odei is better than angular"
        },
        {
          id: 3,
          author: "---",
          body: "i think react odei is better than angular"
        }
      ]
    };
  }
  // Get Comments
  _getComments() {

    return this.state.comments.map(comment => {
      return (
        <Comment 
          author={comment.author} 
          body={comment.body} 
          key={comment.id} />
      );
    });
  }

  _getCommentTitle(commentCount) {
    if (commentCount === 0) {
      return "No comments yet";
    } else if (commentCount === 1) {
      return "1 comment";
    } else {
      return `${commentCount} comments`;
    }
  }

  render() {
    const comments = this._getComments();
    let commentNodes;
    let buttonText = "Show comments";

    if (this.state.showComments) {
      buttonText = "Hide comments";
    }
    if (this.state.showComments) {
      commentNodes = (
        <div className="comment-list">
          {comments}
        </div>
      );
    }
    return (
      <div className="comment-box container">
        <CommentForm addComment={this._addComment.bind(this)} />
        <h1>
          Comments &nbsp;
          <small className="text-muted">
            {this._getCommentTitle(comments.length)}
          </small>
        </h1>
        <hr />
        <button onClick={this._handleClick.bind(this)}>
          {buttonText}
        </button>
        {commentNodes}
      </div>
    );
  }

  _addComment(author, body) {
    const comment = {
      id: this.state.comments.length + 1,
      author,
      body
    };
    this.setState({ comments: this.state.comments.concat([comment]) });
  }

  _handleClick() {
    this.setState({
      showComments: !this.state.showComments
    });
  }
}

render(<App />, document.getElementById("root"));
