import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

const ChannelChild2 = (props) => {
  const { channel, onHide } = props;
  const [channelName, setChannelName] = useState(channel.name);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const updatedChannelData = {
      name: channelName,
    };

    try {
      const response = await axios.post(
        `https://apidev.sundranifilms.co.in/admin/update_channel/${channel.id}`,
        updatedChannelData
      );

      if (response.status === 200) {
        console.log('Channel details updated successfully');
        // Perform any additional actions here, such as showing a success message or refreshing the channel list.
      } else {
        console.log('Failed to update channel details');
        // Handle the failure scenario, such as showing an error message.
      }
    } catch (error) {
      console.error('Error updating channel details:', error);
      // Handle any errors that occurred during the API call, such as showing an error message.
    }

    onHide(); // Close the modal after submitting the form
  };

  return (
    <div>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Update Channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleFormSubmit}>
            <div className="mt-1">
              <label>
                <b>Channel Name</b>
              </label>
              <input
                type="text"
                className="form-control"
                name="channel_name"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
              />
            </div>
            {/* Add other form fields as needed */}
            {/* ... */}
            <Modal.Footer>
              <Button onClick={onHide}>Close</Button>
              <Button variant="primary" type="submit">
                Update
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ChannelChild2;
