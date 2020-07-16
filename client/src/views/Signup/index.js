import React from 'react';
import { connect } from 'react-redux';
import Form from '../../components/Form';
import Navbar from '../../components/Navbar';
import './style.css';
import { validate } from './validate';
import {signUp} from '../../services/store/actions'

let data = [
  { name: 'name', type: 'text', label: 'Enter Your Name', icon: 'user icon' },
  {
    name: 'email',
    type: 'text',
    label: 'Enter Email',
    icon: 'envelope outline icon',
  },
  {
    name: 'password',
    type: 'password',
    label: 'Enter Password',
    icon: 'key icon',
  },
];

class Signup extends React.Component {
  onSubmit = formvalues => {
    // console.log(formvalues);
    this.props.signUp(formvalues)
  };

  render() {
    return (
      <>
        <Navbar />
        <div id="mycard">
          <div className="ui grid">
            <div className="column">
              <h1 className="message">Signup</h1>
              <Form
                onSubmit={this.onSubmit}
                data={data}
                validate={validate}
                btnText={'Signup'}               
              />
              <div className="ui violet message">
                Already have an account? <a href="/login">Login</a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default connect(null,{signUp})(Signup);
