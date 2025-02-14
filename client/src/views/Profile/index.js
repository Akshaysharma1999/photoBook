import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../../components/Navbar';
import Loader from '../../components/Loader';
import './style.css';
import {
  getMyAllPosts,
  updateProfileImage,
} from '../../services/store/actions';

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
  onChangeHandler = e => {
    // console.log(e.target.files[0]);
    const data = new FormData();
    data.append('file', e.target.files[0]);
    data.append('upload_preset', 'photoBook');
    data.append('cloud_name', 'dt9bv7wo6');
    this.props.updateProfileImage({ fileData: data });
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
                  src={this.props.user.user_data.profileImage}
                ></img>
              </div>
              <div style={{ margin: 'auto 100px' }}>
                <div><h1>{this.props.user.user_data.name}</h1></div>
                <div style={{ margin:"15px 0px"}}><h3>{this.props.user.user_data.email}</h3></div>
                
                <div
                  style={{
                    display: 'flex',
                    width: '80%',
                    justifyContent: 'space-between',
                    margin:"20px 0px"
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
                <div style={{ margin: '40px auto' }}>
                  <label for="files" class="ui violet basic button">
                    Update Profile Pic
                  </label>
                  <input
                    id="files"
                    style={{ visibility: 'hidden' }}
                    type="file"
                    accept="image/*"
                    onChange={this.onChangeHandler}
                  />
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
export default connect(mapStateToProps, { getMyAllPosts, updateProfileImage })(
  Profile,
);
