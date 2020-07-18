import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../../components/Navbar';
import Loader from '../../components/Loader';
import './style.css';
import { getMyAllPosts } from '../../services/store/actions';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    props.getMyAllPosts();
  }
  renderMyPosts = () => {
    if (this.props.user && this.props.user.myAllPosts) {
      return this.props.user.myAllPosts.map(post => {
        return <img key={post._id} className="imgItem" src={post.photo}></img>;
      });
    }
  };
  renderContent = () => {
    if (this.props.user && this.props.user.myAllPosts) {
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
                  src="https://images.unsplash.com/photo-1569466896818-335b1bedfcce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                ></img>
              </div>
              <div>
                <h1 className>{this.props.user.user_data.name}</h1>
                <div
                  style={{
                    display: 'flex',
                    width: '130%',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <h5>{this.props.user.myAllPosts.length} posts</h5>
                  </div>
                  <div>
                    <h5>
                      {this.props.user.user_data.following.length} following
                    </h5>
                  </div>
                  <div>
                    <h5>
                      {this.props.user.user_data.followers.length} followers
                    </h5>
                  </div>
                </div>
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
export default connect(mapStateToProps, { getMyAllPosts })(Profile);
