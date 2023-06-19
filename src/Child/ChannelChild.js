import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import AWS from 'aws-sdk';
import config from '../Pages/awsconfig';
import { toast } from 'react-toastify';

const ChannelChild = (props) => {
  
  const { channel : initialChannel, onUpdateChannel } = props;
  const [selectedImage, setSelectedImage] = useState(null);
  const bucketUrl = `https://${config.bucketName}.s3.${config.region}.amazonaws.com/`;
  function getFileNameFromURL(url) {
    const parts = url.split("/");
    const fileName = parts[parts.length - 1];
    return fileName;
  }

  const [channel, setChannel] = useState(initialChannel || {});
  const updateState = (e) => {
    const { name, value } = e.target;
    setChannel((prevChannel) => ({
      ...prevChannel,
      [name]: value,
    }));
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    if (selectedImage) {
      AWS.config.update({
        region: config.region,
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      });
      const s3 = new AWS.S3();
      const params = {
        Bucket: config.bucketName,
        Key: selectedImage.name,
        Body: selectedImage,
        ContentType: selectedImage.type,
      };
      s3.upload(params, (error, data) => {
        if (error) {
          console.error('Error uploading image:', error);
        } else {
          const fileName = getFileNameFromURL(data.Location);
          console.log('Image upload successful:', data.Location);
          setSelectedImage(data.Location)
        }
      });
    }
  };

  const SubmitEditedChannel = async (e) => {
    e.preventDefault();
    try {
      const updatedChannel = {
        id: channel.id,
        name: channel.channel_name,
        image: channel.image,
      };
      if (selectedImage) {
        updatedChannel.image = selectedImage;
      } else {
        updatedChannel.image = channel.image;
      }
      if (updatedChannel.name) {
        updatedChannel.name = updatedChannel.name;
      }
      const res = await fetch('https://apidev.sundranifilms.co.in/admin/update_channel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedChannel),
      });
  
      if (res.ok) {
        toast.success('Channel Details Updated Successfully', {
          position: "top-right",
          autoClose: 2000, 
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
  
        setTimeout(() => {
          onUpdateChannel(updatedChannel);
          console.log(updatedChannel)
          props.onHide();
          window.location.reload();
        }, 2000); 
      } else {
        toast.error('Failed to update channel');
      }
      const resJson = await res.json();
      props.onHide();
    } catch (err) {
      console.log('Error:', err);
    }
  };
  

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Channel
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className='mt-1'>
              <label><b>Channel Name</b></label>
              <input type="text" className="form-control" name='channel_name' value={channel.channel_name}
                onChange={updateState} />
              
            </div>
            <div className='mt-3'>
              <label><b>Image</b></label>
              <input type="file" className="form-control" name='image' 
                onChange={handleImageChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <input type="submit" name="submit" onClick={SubmitEditedChannel} className="btn btn-success" />
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ChannelChild
