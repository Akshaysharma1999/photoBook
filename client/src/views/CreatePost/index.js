import React from 'react';
import { connect } from 'react-redux';
import Form from '../../components/Form';
import Navbar from '../../components/Navbar';
import { validate } from './validate';
import { createPost } from '../../services/store/actions';

let data = [
  {
    name: 'title',
    type: 'text',
    label: 'Enter Title',
    icon: 'pencil alternate icon',
  },
  {
    name: 'body',
    type: 'textarea',
    label: 'Enter text here...',
    icon: 'clipboard outline icon',
  },
  {
    name: 'file',
    type: 'file',
    label: 'Select Image',
    icon: 'folder open outline icon',
    accept: 'image/*',
  },
];
class CreatePost extends React.Component {
  onSubmit = formValues => {
    this.props.createPost(formValues);
  };
  render() {
    return (
      <>
        <Navbar />
        <div className="ui segment container">
          <Form
            data={data}
            btnText={'Post'}
            validate={validate}
            onSubmit={this.onSubmit}
          />
        </div>
      </>
    );
  }
}

export default connect(null, { createPost })(CreatePost);
