import React from 'react';
import { connect } from 'react-redux';
import Form from '../../components/Form';
import Navbar from '../../components/Navbar';
import './style.css';
import { validate } from './validate';
import {logIn} from '../../services/store/actions'

let data = [
  { name: 'email', type: 'text', label: 'Enter Email', icon: 'envelope outline icon' },
  {
    name: 'password',
    type: 'password',
    label: 'Enter Password',
    icon: 'key icon',
  },
];

class Login extends React.Component {
  onSubmit = formvalues => {
    // console.log(formvalues);
     this.props.logIn(formvalues)
  };

  render() {
    return (
      <>
        <Navbar />
        <div id="mycard">
          <div className="ui grid">
            <div className="column">
              <h1 className="message">Login</h1>
              <Form
                onSubmit={this.onSubmit}
                data={data}
                validate={validate}
                btnText={'Login'}               
              />
              <div className="ui violet message">
                New to us? <a href="/signup">Sign Up</a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default connect(null,{logIn})(Login);
