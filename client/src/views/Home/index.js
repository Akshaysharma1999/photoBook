import React from 'react';
import Navbar from '../../components/Navbar';
import { connect } from 'react-redux';
import { getAllPosts } from '../../services/store/actions';

class Home extends React.Component {
  constructor(props) {
    super(props);
    props.getAllPosts();
  }
  renderPosts = () => {
    if (this.props.posts && this.props.posts.allposts) {
      return this.props.posts.allposts.map(post => {
        return (
          <div
            className="ui card fluid"
            style={{ margin: '30px auto', maxWidth: '550px' }}
          >
            <div class="content">
              <div class="right floated meta">14h</div>
              <img
                alt="postImage"
                class="ui avatar image"
                src="https://images.unsplash.com/photo-1569466896818-335b1bedfcce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              />
              {post.postedBy.name}
            </div>
            <div class="image">
              <img src={post.photo} />
            </div>
            <div class="content">
              <a class="header">{post.title}</a>
              <div class="meta">
                <span class="date">{post.body}</span>
              </div>
              <span class="right floated">
                <i class="heart outline like icon"></i>
                17 likes
              </span>
              <i class="comment icon"></i>3 comments
            </div>

            <div class="extra content">
              <div class="ui large transparent left icon input">
                <i class="heart outline icon"></i>
                <input type="text" placeholder="Add Comment..." />
              </div>
            </div>
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
  console.log(state)
  return { ...state };
};
export default connect(mapStateToProps, { getAllPosts })(Home);
