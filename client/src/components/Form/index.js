import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';

let validate;
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      disabled: false,
    };
    validate = this.props.validate;
    this.props.reset();
  }
  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui basic red pointing prompt label transition visible">
          {error}
        </div>
      );
    }
  };

  /**
   * Function to submit uploaded file .
   */
  onChangeHandler = e => {
    // console.log(e.target.files[0]);
    this.setState({
      selectedFile: e.target.files[0],
      loaded: 0,
    });
  };

  renderInput = ({ input, label, meta, type, icon, accept }) => {
    if (type === 'textarea') {
      return (
        <div class="field">
          <label></label>
          <textarea
            onChange={input.onChange}
            value={input.value}
            type={type}
            placeholder={label}
          ></textarea>
          {this.renderError(meta)}
        </div>
      );
    } else if (type === 'file') {
      return (
        <div className="field">
          <div className="ui left icon input">
            <i className={icon}></i>
            <input
              accept={accept}
              type={type}
              placeholder={label}
              onChange={this.onChangeHandler}
            />
          </div>
          {/* {this.renderError(meta)} */}
        </div>
      );
    } else {
      return (
        <div className="field">
          <div className="ui left icon input">
            <i className={icon}></i>
            <input
              onChange={input.onChange}
              value={input.value}
              type={type}
              placeholder={label}
            />
          </div>
          {this.renderError(meta)}
        </div>
      );
    }
  };

  renderFields = () => {
    return this.props.data.map(element => {
      return (
        <Field
          name={element.name}
          type={element.type}
          component={this.renderInput}
          label={element.label}
          icon={element.icon}
          accept={element.accept}
        />
      );
    });
  };

  onSubmit = async formValues => {
    let data = null;
    this.setState({ disabled: true });
    if (this.state.selectedFile !== null) {
      data = new FormData();
      data.append('file', this.state.selectedFile);
      data.append('upload_preset', 'photoBook');
      data.append('cloud_name', 'dt9bv7wo6');
    }
    let a = await this.props.onSubmit({ ...formValues, fileData: data });
    this.props.reset();
    //  console.log(a)
  };

  render() {
    // console.log(this.props);
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="error ui large form"
      >
        <div class="ui segment">{this.renderFields()}</div>
        <button
          type="submit"
          disabled={this.props.submitting}
          className="ui fluid large violet submit button"
        >
          {this.props.btnText}
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'Form',
  validate,
})(LoginForm);
