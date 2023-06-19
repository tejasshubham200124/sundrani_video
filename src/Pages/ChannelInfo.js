import React, { useState, useEffect } from 'react'
import { Tabs, Tab } from 'react-bootstrap';
import { useParams } from 'react-router';
import { FiEdit } from 'react-icons/fi'
import { MdDelete } from 'react-icons/md'
import { Tooltip } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Slider from "react-slick";
import axios from 'axios';
import swal from 'sweetalert';
import 'slick-carousel/slick/slick.js';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AWS from 'aws-sdk';
import config from '../Pages/awsconfig';

const MainChild = lazy(() => import('../Child/MainChild'));

const ChannelInfo = () => {

    const [activeTab, setActiveTab] = useState('tab1');
    const [selectedImage, setSelectedImage] = useState(null)
    const [topic_name, setTopic_name] = useState()
    const [topic_desc, setTopic_desc] = useState()
    const [selectedVideo, setSelectedVideo] = useState()
    const [video_status, setVideo_status] = useState()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow2 = () => setShow1(true);
    const [channelName, setChannelName] = useState([])
    const [channels, setChannels] = useState([])
    const [mainChannel, setMainChannel] = useState([])
    const [videoCategories, setVideoCategories] = useState([]);
    const [modalData, setModalData] = useState(null);
    const [editModalShow, setEditModalShow] = useState(false);

    const { id } = useParams();

    const openEditModal = (channel) => {
        setEditModalShow(true);
        setModalData(channel);
    };

    const handleUpdateVideo = (updatedVideo) => {
        console.log(updatedVideo);
    }

    const handleSelect = (selectedTab) => {
        setActiveTab(selectedTab);
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
        if (file) {
            AWS.config.update({
                region: config.region,
                accessKeyId: config.accessKeyId,
                secretAccessKey: config.secretAccessKey,
            });
            const s3 = new AWS.S3();
            const params = {
                Bucket: config.bucketName,
                Key: file.name,
                Body: file,
                ContentType: file.type,
            };
            s3.upload(params, (error, data) => {
                if (error) {
                    console.error('Error uploading image:', error);
                } else {
                    const fileName = getFileNameFromURL(data.Location);
                    console.log('Image upload successful:', data.Location);
                    setSelectedImage(data.Location);
                }
            });
        }
    };

    const handleVideoChange = (event) => {
        const file = event.target.files[0];
        setSelectedVideo(file);
        if (file) {
            AWS.config.update({
                region: config.region,
                accessKeyId: config.accessKeyId,
                secretAccessKey: config.secretAccessKey,
            });
            const s3 = new AWS.S3();
            const params = {
                Bucket: config.bucketName,
                Key: file.name,
                Body: file,
                ContentType: file.type,
            };
            s3.upload(params, (error, data) => {
                if (error) {
                    console.error('Error uploading video:', error);
                } else {
                    const fileName = getFileNameFromURL(data.Location);
                    console.log('Video upload successful:', data.Location);
                    setSelectedVideo(data.Location);
                }
            });
        }
    };

    const handleClose2 = async () => {
        try {
            const response = await fetch('https://apidev.sundranifilms.co.in/admin/insert_categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    categories: channelName,
                    id: id
                }),
            });
            if (response.ok) {
                toast.success(' New Category added Successfully', {
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
            console.log(channelName)
            const data = await response.json();
            console.log('Add Channel Response:', data);
            handleClose();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleClose3 = async () => {
        try {
            const response = await fetch('https://apidev.sundranifilms.co.in/admin/insert_video_main', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: selectedImage,
                    topic_name: topic_name,
                    topic_desc: topic_desc,
                    video: selectedVideo,
                    video_status: video_status,
                    channel_id: id
                }),
            });
            if (response.ok) {
                toast.success(' New Main video added Successfully', {
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
            console.log('Add Main video:', data);
            handleClose();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        axios.post('https://apidev.sundranifilms.co.in/admin/get_main_video', { id: id }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setMainChannel(response.data.result);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const deleteChannel = (id) => {
        swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this video !",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then(async (willDelete) => {
          if (willDelete) {
            try {
              const response = await fetch("https://apidev.sundranifilms.co.in/admin/delete_channel_main", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "id": id }),
              });
              setChannels(channels.filter(channel => channel.id !== id));
              const data = await response.json();
              swal("Video has been deleted !", {
                icon: "success",
              });
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            } catch (error) {
              console.error(error);
            }
          } else {
            swal("Your video  is safe!");
          }
        });
      };

    useEffect(() => {
        axios.post('https://apidev.sundranifilms.co.in/admin/get_all_video_by_categories', { id: id }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setVideoCategories(response.data.result);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
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
            <div className='tabular'>
                <Tabs activeKey={activeTab} onSelect={handleSelect}>
                    <Tab eventKey="tab1" title="Main Video">
                        <div className='mt-4'>
                            <Button className="button-17" onClick={handleShow}>
                                Add Main video
                            </Button>
                        </div>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Video Details</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="form-group mt-1">
                                    <label className="form-label"><b>Video Name</b></label>
                                    <input type="text" className="form-control"
                                        name='topic_name' value={topic_name}
                                        onChange={(e) => setTopic_name(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mt-1">
                                    <label className="form-label"><b>Video description</b></label>
                                    <input type="text" className="form-control"
                                        name='topic_desc' value={topic_desc}
                                        onChange={(e) => setTopic_desc(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <div className="form-group mt-1">
                                        <label for="exampleFormControlSelect1"><b>Video Status</b></label>
                                        <Form.Select aria-label="Default select example" name="video_satus" value={video_status}
                                            onChange={(e) => setVideo_status(e.target.value)}
                                        >
                                            <option value="1">Public</option>
                                            <option value="2">Private</option>
                                            <option value="3">0</option>
                                        </Form.Select>
                                        <div className={video_status === '2' ? 'show-fields' : 'hide-fields'}>
                                            <div className='form-group mt-1'>
                                                <label className='form-label'><b>Video Price</b></label>
                                                <input type='text' className='form-control'></input>
                                            </div>
                                            <div className='form-group mt-1'>
                                                <label className='form-label'><b>Subscription</b></label>
                                                <input type='text' className='form-control'></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="form-group mt-1">
                                        <label className="form-label"><b>Video</b></label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            name='video'
                                            value={channels.video_file}
                                            onChange={handleVideoChange}
                                        />
                                    </div>
                                    <div className="form-group mt-1">
                                        <label className="form-label"><b>Video Image</b></label>
                                        <input type="file" className="form-control"
                                            name='image'
                                            value={channels.coverImage}
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleClose3}>
                                    Submit
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <div className='mt-4'>
                            <Slider {...settings}>
                                {mainChannel.map((channel) => (
                                    <div className="mt-3" key={channel.id}>
                                        <div className="main-video-image">
                                            <img src={channel.coverImage} alt="Channel Cover" />
                                        </div>
                                        <Card.Body>
                                            <Card.Title className="title d-flex flex-row justify-content-center align-items-center">
                                                <Tooltip placement="bottom" title={channel.video_name}>
                                                    <p id="app-title">
                                                        {channel.video_name.slice(0, 70)}
                                                        {channel.video_name.length > 70 ? '...' : ''}
                                                    </p>
                                                </Tooltip>
                                            </Card.Title>
                                            <div className="mt-3 d-flex flex-row justify-content-center align-items-center g-2 icon">
                                                <FiEdit className="fs-4" onClick={() => openEditModal(channel)} style={{ color: 'green', cursor: 'pointer' }} />
                                                <MdDelete className="fs-3" style={{ color: 'red', cursor: 'pointer' }}
                                                  onClick={() => deleteChannel(channel.id)}
                                                />
                                            </div>
                                        </Card.Body>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                       
                    </Tab>
                    <Tab eventKey="tab2" title="Categories">
                        <div className='mt-4'>
                            <Button className="button-17" onClick={handleShow2}>
                                Add Categories
                            </Button>
                        </div>
                        <Modal show={show1} onHide={handleClose1}>
                            <Modal.Header closeButton>
                                <Modal.Title>Add Category</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="form-group mt-1">
                                    <label className="form-label"><b>Category Name</b></label>
                                    <input type="text" className="form-control"
                                        value={channelName}
                                        onChange={(e) => setChannelName(e.target.value)}
                                        name="categories"
                                    />
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose1}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleClose2}>
                                    Add
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <section className='first-half mt-2'>
                            {videoCategories.map((category) => (
                                <div key={category.category_id}>
                                    <div className='mt-4 d-flex flex-row  g-2 icon'>
                                        <p>{category.category_name}</p>
                                        <Link
                                            to={`/admin/View/${category.category_id}`}
                                            className='linkcss'
                                        >
                                            <FiEdit className='fs-5'
                                                style={{ color: 'green', cursor: "pointer" }} />
                                        </Link>
                                        <MdDelete
                                            className='fs-4'
                                            style={{ color: 'red', cursor: 'pointer' }}
                                        />
                                    </div>
                                    <div className='row'>
                                        {category.videos.length === 0 ? (
                                            <span className='no-video'>No videos available</span>
                                        ) : (
                                            category.videos.slice(0, 3).map((video) => (
                                                <div key={video.id} className='col-md-4'>
                                                    <div className='video-item'>
                                                        <div className='category-video-img'>
                                                            <img src={`https://sarsundrani.s3.ap-south-1.amazonaws.com/${video.image}`} alt={video.image} />
                                                        </div>
                                                        <Card.Body>
                                                            <Card.Title className='title d-flex flex-row justify-content-center align-items-center'>
                                                                <Tooltip placement="bottom" title={video.topic_name}>
                                                                    <p id="app-title">
                                                                        {video.topic_name.slice(0, 70)}
                                                                        {video.topic_name.length > 70 ? '...' : ''}
                                                                    </p>
                                                                </Tooltip>
                                                            </Card.Title>
                                                        </Card.Body>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            ))}
                        </section>
                    </Tab>
                </Tabs>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                {modalData && (
                    <MainChild
                        show={editModalShow}
                        onHide={() => {
                            setEditModalShow(false);
                            setModalData(null);
                        }}
                     channel={modalData}
                     updateVideo={handleUpdateVideo}
                    />
                )}
            </Suspense>
        </div>
    )
}

export default ChannelInfo;