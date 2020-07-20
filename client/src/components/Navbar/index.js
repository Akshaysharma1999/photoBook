import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './style.css';
import logout from '../../utils/logout';

class Navbar extends React.Component {
  handleClick = () => {
    this.props.logout();
  };

  renderContent = () => {
    if (!this.props.user.isLogedIn) {
      return (
        <div class="ui large menu">
          <Link class="item " id="logo" to="/">
            PhotoBook
          </Link>
          <div class="right menu">
            <div class="item">
              <Link to="/login">
                <div class="ui black basic button">Login</div>
              </Link>
            </div>
            <div class="item">
              <Link to="/signup">
                <div class="ui black basic button">Sign Up</div>
              </Link>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div class="ui large stackable menu">
          <Link class="item " id="logo" to="/">
            PhotoBook
          </Link>
          <div class="right menu">           
            <div class="item">
              <Link to="/myfeed">
                <div class="ui black basic button">My Feed</div>
              </Link>
            </div>
            <div class="item">
              <Link to="/createpost">
                <div class="ui black basic button">Create Post</div>
              </Link>
            </div>
            <div class="item">
              <Link to="/signup">
                <div class="ui black basic button" onClick={this.handleClick}>
                  Logout
                </div>
              </Link>
            </div>
            <div class="item">
              <Link to="/profile">
                <div class="ui black basic button">Profile</div>
              </Link>
            </div>
          </div>
        </div>
      );
    }
  };

  render() {
    return <div>{this.renderContent()}</div>;
  }
}
const mapStateToProps = state => {
  return { ...state };
};

export default connect(mapStateToProps, { logout })(Navbar);
