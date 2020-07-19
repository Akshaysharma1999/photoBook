import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../../components/Navbar';
import Loader from '../../components/Loader';
import './style.css';
import {
  getProfile,
  followUser,
  unFollowUser,
} from '../../services/store/actions';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    props.getProfile(props.match.params.id);
  }
  renderMyPosts = () => {
    if (this.props.userProfile && this.props.userProfile.posts) {
      return this.props.userProfile.posts.map(post => {
        return <img key={post._id} className="imgItem" src={post.photo}></img>;
      });
    }
  };
  renderFollowButton =  () => {
    if (this.props.user.user_data._id !== this.props.userProfile.user._id) {
      let b = false;
      this.props.user.user_data.following.map(foll => {
        if (foll === this.props.userProfile.user._id) {
          b = true;
          return;
        }
      });

      if (b) {
        return (
          <div style={{ margin: '40px auto' }}>
            <button
              class="ui violet button"
              onClick={() => {
                this.props.unFollowUser(this.props.userProfile.user._id);
              }}
            >
              Following
            </button>
          </div>
        );
      } else {
        return (
          <div style={{ margin: '40px auto' }}>
            <button
              class="ui violet basic button"
              onClick={() => {
                this.props.followUser(this.props.userProfile.user._id);
              }}
            >
              Follow
            </button>
          </div>
        );
      }
    }
  };
  renderContent = () => {
    if (
      this.props.userProfile &&
      this.props.match.params.id === this.props.userProfile.user._id
    ) {
      return (
        <div>
          <Navbar />
          <div style={{ maxWidth: '650px', margin: '0px auto' }}>
            {/* profile info */}
            <div
              className="ui piled segment"
              style={{
                display: 'flex',
                margin: '18px 0px',
                justifyContent: 'space-around',
              }}
            >
              <div>
                <img
                  style={{
                    width: '160px',
                    height: '160px',
                    borderRadius: '80px',
                  }}
                  alt="profileImage"
                  src={this.props.userProfile.user.profileImage}
                ></img>
              </div>
              <div>
                <h1 className>{this.props.userProfile.user.name}</h1>
                <div
                  style={{
                    display: 'flex',
                    width: '130%',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <h5>{this.props.userProfile.posts.length} posts</h5>
                  </div>
                  <div>
                    <h5>
                      {this.props.userProfile.user.following.length} following
                    </h5>
                  </div>
                  <div>
                    <h5>
                      {this.props.userProfile.user.followers.length} followers
                    </h5>
                  </div>
                </div>
                {this.renderFollowButton()}
              </div>
            </div>
            {/* gallery */}
            <div className="ui segment">
              <div className="gallery">{this.renderMyPosts()}</div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Loader />;
    }
  };
  render() {
    return this.renderContent();
  }
}
const mapStateToProps = state => {
  return { ...state };
};
export default connect(mapStateToProps, {
  getProfile,
  followUser,
  unFollowUser,
})(UserProfile);
