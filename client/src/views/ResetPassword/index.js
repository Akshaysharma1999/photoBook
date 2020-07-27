import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Form from '../../components/Form';
import Navbar from '../../components/Navbar';
import './style.css';
import { validate } from './validate';
import { resetPassword } from '../../services/store/actions';

let data = [
  {
    name: 'password',
    type: 'password',
    label: 'Enter Password',
    icon: 'key icon',
  },
  {
    name: 'confirmPassword',
    type: 'password',
    label: 'Confirm Password',
    icon: 'key icon',
  },
];

class ResetPassword extends React.Component {
  onSubmit = formvalues => {
    console.log(formvalues);
    // console.log(this.props)
    this.props.resetPassword({
      ...formvalues,
      token: this.props.match.params.id,
    });
  };

  render() {
    return (
      <>
        <Navbar />
        <div id="mycard">
          <div className="ui grid">
            <div className="column">
              <h1 className="message">Reset Password</h1>
              <Form
                onSubmit={this.onSubmit}
                data={data}
                validate={validate}
                btnText={'Reset Password'}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default connect(null, { resetPassword })(ResetPassword);
