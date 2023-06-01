import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.js';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FiEdit } from 'react-icons/fi'
import { MdDelete } from 'react-icons/md'
import { Link } from 'react-router-dom';
import ChannelChild from '../Child/ChannelChild';
import axios from 'axios';
import swal from 'sweetalert';
import AWS from 'aws-sdk';
import config from '../Pages/awsconfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChannelList = () => {

  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState();
  const [channels, setChannels] = useState([])
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [channelName, setChannelName] = useState([])
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  useEffect(() => {
    axios.post('https://apidev.sundranifilms.co.in/admin/get_all_channel')
      .then(response => {
        setChannels(response.data.result);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleChannelUpdate = (updatedChannel) => {
    setChannels(prevChannels => {
      return prevChannels.map(channel => {
        if (channel.id === updatedChannel.id) {
          return {
            ...channel,
            name: updatedChannel.name,
            image: updatedChannel.image,
          };
        }
        return channel;
      });
    });
  };

  function getFileNameFromURL(url) {
    const parts = url.split("/");
    const fileName = parts[parts.length - 1];
    return fileName;
  }
  const bucketUrl = `https://${config.bucketName}.s3.${config.region}.amazonaws.com/`;
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

  const handleClose2 = async () => {
    try {
      const response = await fetch('https://apidev.sundranifilms.co.in/admin/add_channel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: channelName,
          image: selectedImage,
        }),
      });
      if (response.ok) {
        toast.success(' New Channel Added Successfully', {
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
          window.location.reload();
        }, 2000);
      } else {
        toast.error('Failed to add channel');
      }
      const data = await response.json();
      console.log('Add Channel Response:', data);
      handleClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteChannel = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Channel!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const response = await fetch("https://apidev.sundranifilms.co.in/admin/delete_channel", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "id": id }),
          });
          setChannels(channels.filter(channel => channel.id !== id));
          const data = await response.json();
          swal("Poof! Channel  has been deleted!", {
            icon: "success",
          });
        } catch (error) {
          console.error(error);
        }
      } else {
        swal("Your channel is safe!");
      }
    });
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Button className="button-17" onClick={handleShow}>
        Add Channels
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mt-1">
            <label className="form-label"><b>Channel icon</b></label>
            <input
              type="file"
              className="form-control"
              onChange={handleImageChange}
              value={channels.image}
              name='image'
            />
          </div>
          <div className="form-group mt-1">
            <label className="form-label"><b>Channel Name</b></label>
            <input type="text" className="form-control"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              name="channelName"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary"
            onClick={handleClose2}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
      <div className='mt-4'>
        <Slider {...settings}>
          {channels.map((channel) => (
            <div className='mt-4' key={channel.id}>
              <Card style={{ width: '13rem' }}>
                <Card.Img variant="top" src={channel.image} alt={channel.image} />
                <Card.Body>
                  <Link
                    to={`/admin/Channel_Info/${channel.id}`}
                    className='linkcss'
                  >
                    <Card.Title className='title d-flex flex-row justify-content-center align-items-center'>
                      {channel.channel_name}
                    </Card.Title>
                  </Link>
                  <div className='mt-3 d-flex flex-row justify-content-center align-items-center g-3 icon'>
                    <FiEdit className='fs-4' onClick={() => { setModalData(channel); setModalShow(true); }} style={{ color: 'green', cursor: "pointer" }} />
                    <MdDelete
                      className='fs-3'
                      style={{ color: 'red', cursor: 'pointer' }}
                      onClick={() => deleteChannel(channel.id)}
                    />
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </Slider>
      </div>
      {modalData && (
        <ChannelChild
          show={modalShow}
          channel={modalData}
          onHide={() => {
            setModalShow(false);
            setModalData(null);
          }}
          onUpdateChannel={handleChannelUpdate}
        />
      )}
    </div>
  )
}

export default ChannelList