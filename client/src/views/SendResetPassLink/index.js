import React from 'react';
import { connect } from 'react-redux';
import Form from '../../components/Form';
import Navbar from '../../components/Navbar';
import './style.css';
import { validate } from './validate';
import {sendResetPassLink} from '../../services/store/actions'

let data = [
  { name: 'email', type: 'text', label: 'Enter Email', icon: 'envelope outline icon' },  
];

class SendResetPassLink extends React.Component {
  onSubmit = formvalues => {
    // console.log(formvalues);
     this.props.sendResetPassLink(formvalues)
  };

  render() {
    return (
      <>
        <Navbar />
        <div id="mycard">
          <div className="ui grid">
            <div className="column">
              <h1 className="message">Forgot Password</h1>
              <Form
                onSubmit={this.onSubmit}
                data={data}
                validate={validate}
                btnText={'Send Link'}               
              />              
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default connect(null,{sendResetPassLink})(SendResetPassLink);
