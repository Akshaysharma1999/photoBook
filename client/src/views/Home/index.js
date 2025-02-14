import React from 'react';
import Navbar from '../../components/Navbar';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getAllPosts,
  likePost,
  unLikePost,
  makeComment,
  deletePost,
} from '../../services/store/actions';

class Home extends React.Component {
  constructor(props) {
    super(props);
    props.getAllPosts();
  }
  setLikeClass = post => {
    let b = false;
    post.likes.map(user => {
      if (user === this.props.user.user_data._id) {
        b = true;
      }
    });
    if (b === true) {
      return 'heart red icon';
    } else {
      return 'heart outline like icon';
    }
  };
  likeClick = (e, postId) => {
    // console.log(e.target.className)
    if (e.target.className === 'heart red icon') {
      this.props.unLikePost(postId);
    } else {
      this.props.likePost(postId);
    }
  };
  renderLike = post => {
    if (this.props.user && this.props.user.isLogedIn) {
      return (
        <span class="right floated">
          <i
            className={this.setLikeClass(post)}
            onClick={e => this.likeClick(e, post._id)}
          ></i>
          {post.likes.length} likes
        </span>
      );
    } else {
      return (
        <span class="right floated">
          <i className="heart outline icon"></i>
          {post.likes.length} likes
        </span>
      );
    }
  };

  renderComments = post => {
    if (this.props.user && this.props.user.isLogedIn) {
      return (
        <div class="extra content">
          <div class="ui large transparent left icon input">
            <i class="pencil alternate icon"></i>
            <input
              type="text"
              placeholder="Add Comment..."
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  this.props.makeComment(post._id, e.target.value);
                  e.target.value = '';
                }
              }}
            />
          </div>
        </div>
      );
    }
  };

  renderCommentsByUser = post => {
    return post.comments.map(comment => {
      return (
        <div>
          <Link to={`/userprofile/${comment.postedBy._id}`}>
            <b style={{ color: 'black' }}>{comment.postedBy.name}</b>
          </Link>
          : {comment.text}
        </div>
      );
    });
  };

  renderPostDelete = post => {
    if (
      this.props.user &&
      this.props.user.user_data &&
      this.props.user.user_data._id &&
      post
    ) {
      if (post.postedBy._id === this.props.user.user_data._id) {
        return (
          <div class="right floated meta">
            <i
              class="trash alternate outline red icon"
              onClick={() => {
                this.props.deletePost(post._id);
              }}
            ></i>
          </div>
        );
      }
    }
  };
  renderPosts = () => {
    if (this.props.posts && this.props.posts.allposts) {
      return this.props.posts.allposts.map(post => {
        return (
          <div
            className="ui card fluid"
            style={{ margin: '30px auto', maxWidth: '550px' }}
          >
            <div class="content">
              {this.renderPostDelete(post)}
              <img
                alt="postImage"
                class="ui avatar image"
                src={post.postedBy.profileImage}
              />
              <Link to={`/userProfile/${post.postedBy._id}`}>
                {post.postedBy.name}
              </Link>
            </div>
            <div class="image">
              <img src={post.photo} />
            </div>
            <div class="content">
              <a class="header">{post.title}</a>
              <div class="meta">
                <span class="date">{post.body}</span>
              </div>
              {this.renderLike(post)}
              {post.comments.length} Comments
              {this.renderCommentsByUser(post)}
            </div>
            {this.renderComments(post)}
          </div>
        );
      });
    }
  };
  render() {
    return (
      <div>
        <Navbar />      
        <div className="ui container">{this.renderPosts()}</div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  // console.log(state);
  return { ...state };
};
export default connect(mapStateToProps, {
  getAllPosts,
  likePost,
  unLikePost,
  makeComment,
  deletePost,
})(Home);
