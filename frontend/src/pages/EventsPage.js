import React, { Component } from 'react';

import './EventsPage.css';
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';

class EventsPage extends Component {
  state = {
    creating: false
  }

  startCreateEventHandler = () => {
    this.setState({creating: true})
  }

  modalConfirmHandler = () => {
    this.setState({creating: false})
  }

  modalCancelHandler = () => {
    this.setState({creating: false})
  }
  render() {
    return (
      <React.Fragment>
          {this.state.creating && <Backdrop />}
          {this.state.creating && <Modal
            title="Add Event"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
          >
            <p>Modal</p>
          </Modal>}
          <div className="events-control">
            <p>Create your own events!</p>
            <button className="btn" onClick={this.startCreateEventHandler}>Create Event</button>
          </div>
      </React.Fragment>
    );
  }
}

export default EventsPage;