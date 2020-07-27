import React from 'react';
import { connect } from 'react-redux';
import { Button, Header, Icon, Modal, Dropdown } from 'semantic-ui-react';
import { searchUser } from '../../services/store/actions';

let options = [];
class ModalComp extends React.Component {
  constructor(props) {
    super(props);
    props.user.searchUserArr = [];
    this.state = { modalOpen: false };
  }

  setOptions = () => {
    options = [];
    if (this.props.user.searchUserArr.length !== 0) {
      this.props.user.searchUserArr.map(user => {
        options.push({ key: user._id, text: user.email, value: user._id });
      });
      return options;
    } else {
      return options;
    }
  };

  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ modalOpen: false });

  handleSearch = value => {
    if (value !== null) {
      window.location.assign(`/userProfile/${value}`);
    } else {
      window.location.assign(`/`);
    }
  };
  render() {
    return (
      <Modal
        open={this.state.modalOpen}
        onClose={this.handleClose}
        trigger={
          <Button className="ui black basic button" onClick={this.handleOpen}>
            Search User
          </Button>
        }
        closeIcon
      >
        <Header icon="user" content="Search User" />
        <Modal.Content>
          <Dropdown
            onSearchChange={e => {
              return this.props.searchUser(e.target.value);
            }}
            onChange={(e, value) => {
              this.handleSearch(value.value);
            }}
            clearable
            fluid
            search
            selection
            options={this.setOptions()}
            placeholder="Search User"
          />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleClose} color="red">
            <Icon name="remove" />
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};
export default connect(mapStateToProps, {
  searchUser,
})(ModalComp);
