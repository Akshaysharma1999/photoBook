import React from 'react';
import Navbar from '../../components/Navbar';
import './style.css';

class Profile extends React.Component {
  render() {
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
              <h1 className>Akshay Sharma</h1>
              <div
                style={{
                  display: 'flex',
                  width: '130%',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <h5>40 posts</h5>
                </div>
                <div>
                  <h5>40 following</h5>
                </div>
                <div>
                  <h5>40 followers</h5>
                </div>
              </div>
            </div>
          </div>
          {/* gallery */}
          <div className="ui segment">
            <div className="gallery">
              <img
                className="imgItem"
                src="https://images.unsplash.com/photo-1569466896818-335b1bedfcce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              ></img>
              <img
                className="imgItem"
                src="https://images.unsplash.com/photo-1569466896818-335b1bedfcce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              ></img>
              <img
                className="imgItem"
                src="https://images.unsplash.com/photo-1569466896818-335b1bedfcce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              ></img>
              <img
                className="imgItem"
                src="https://images.unsplash.com/photo-1569466896818-335b1bedfcce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              ></img>
              <img
                className="imgItem"
                src="https://images.unsplash.com/photo-1569466896818-335b1bedfcce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              ></img>
              <img
                className="imgItem"
                src="https://images.unsplash.com/photo-1569466896818-335b1bedfcce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              ></img>
              <img
                className="imgItem"
                src="https://images.unsplash.com/photo-1569466896818-335b1bedfcce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              ></img>
              <img
                className="imgItem"
                src="https://images.unsplash.com/photo-1569466896818-335b1bedfcce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              ></img>
              <img
                className="imgItem"
                src="https://images.unsplash.com/photo-1569466896818-335b1bedfcce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              ></img>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
