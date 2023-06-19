import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import PlyrPlayer from './PlyrPlayer';
import 'plyr/dist/plyr.css';
import { toast } from 'react-toastify';

const ChannelInfoChild = (props) => {

  const [video_type, setVideo_type] = useState();
  const [topicName, setTopicName] = useState(props.video?.topic_name || '');
  const [topicDesc, setTopicDesc] = useState(props.video?.topic_desc || '');
  const [videoStatus, setVideoStatus] = useState(props.video?.video_status || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const updatedVideo = {
      id: props.video?.id || '',
      category_id: props.video?.category_id || '',
      video_type: props.video?.video_type || '',
      video_price: props.video?.video_price || '',
      video_status: videoStatus,
      active_days: props.video?.active_days || '',
      topic_name: topicName,
      topic_desc: topicDesc,
      video_file: props.video?.video_file || '',
      image: props.video?.image || '',
    };
  
    try {
      const response = await fetch('https://apidev.sundranifilms.co.in/admin/update_video_details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedVideo),
      });
  
      if (response.ok) {
        toast.success('Video Details updated Succesfully', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        setTimeout(() => {
          const updatedVideoDetails = {
            ...props.video,
            topic_name: topicName,
            topic_desc: topicDesc,
            video_status: videoStatus,
          };
          props.updateVideo(updatedVideoDetails);
          window.location.reload()
        }, 2000);
        props.onHide();
      } else {
        toast.error('An error occurred while updating the video');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while updating the video');
    }
  };
  
  const VideoDetails = () => {
    const options = {
      controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen', 'pip'],
      fullscreen: { enabled: true, fallback: true },
      pip: { enabled: true },
    };

    return (
      <div className='video mt-4'>
        <PlyrPlayer
          src={`https://sarsundrani.s3.ap-south-1.amazonaws.com/${props.video?.video_file}`}
          alt={props.video?.video_file}
          options={options}
          className='video'
        />
      </div>
    );
  };

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className='new-modal'
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Video Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className='mt-1'>
              <label><b>Video Name</b></label>
              <input
                type="text"
                className="form-control"
                name="topicName"
                onChange={(e) => setTopicName(e.target.value)}
                defaultValue={props.video?.topic_name || ''}
              />
            </div>
            <div className="form-group mt-1">
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" className="form-label"><b>Video Description</b></label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                  defaultValue={props.video?.topic_desc || ''}
                  onChange={(e) => setTopicDesc(e.target.value)}
                  name='topicDesc'
                  style={{ overflow: 'hidden' }}
                ></textarea>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group mt-1">
                  <label htmlFor="exampleFormControlSelect1"><b>Video Status</b></label>
                  <Form.Select
                    aria-label="Default select example"
                    name="videoStatus"
                    onChange={(e) => setVideoStatus(e.target.value)}
                    defaultValue={props.video?.video_status || ''}
                  >
                    <option value="1">Public</option>
                    <option value="2">Private</option>
                    <option value="3">0</option>
                  </Form.Select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mt-1">
                  <label htmlFor="exampleFormControlSelect2"><b>Video Type</b></label>
                  <Form.Select
                    aria-label="Default select example"
                    name="video_type"
                    defaultValue={props.video?.video_type || ''}
                    onChange={(e) => setVideo_type(e.target.value)}
                  >
                    <option value="1">Free</option>
                    <option value="2">Paid</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className={`col-md-6 ${video_type === '2' ? '' : 'd-none'}`}>
                <div className="form-group mt-1">
                  <label className="form-label"><b>Video Price</b></label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              {video_type === '2' && (
                <div className="col-md-6">
                  <div className="form-group mt-1">
                    <label className="form-label"><b>Subscription</b></label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
              )}
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <div className='video mt-1'>
                  <VideoDetails />
                </div>
              </div>
              <div className='col-md-6 category-video-img2'>
              <img src={`https://sarsundrani.s3.ap-south-1.amazonaws.com/${props.video?.image}`}  />
              </div>
            </div>
            <div className="row mt-1">
              <div className="col">
                <div className="form-group mt-1">
                  <label className="form-label"><b>Video</b></label>
                  <input type="file" className="form-control" />
                </div>
              </div>
              <div className="col">
                <div className="form-group mt-1">
                  <label className="form-label"><b>Video Image </b></label>
                  <input type="file" className="form-control" />
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <input type="submit" name="submit" onClick={handleSubmit} className="btn btn-success" />
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ChannelInfoChild;
