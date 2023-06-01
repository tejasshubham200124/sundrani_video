import React, { useState } from 'react'
import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.js';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FiEdit } from 'react-icons/fi'
import { MdDelete } from 'react-icons/md'
import 'react-toastify/dist/ReactToastify.css';
import AWS from 'aws-sdk';
import config from '../Pages/awsconfig';
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
                }),
            });
            setChannels([...channels, channelName]);
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
                    video_status: video_status
                }),
            });
            console.log(selectedImage)
            console.log(topic_name)
            console.log(topic_desc)
            console.log(selectedVideo)
            console.log(video_status)
            const data = await response.json();
            console.log('Add Main video:', data);
            handleClose();
        } catch (error) {
            console.error('Error:', error);
        }
    };

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


    return (
        <div>
            <div>
                <p className='music'>

                </p>
            </div>
            <div className='tabular'>
                <Tabs activeKey={activeTab} onSelect={handleSelect}>
                    <Tab eventKey="tab1" title="Main Video">
                        <div className='mt-4'>
                            <Button className="button-17" onClick={handleShow}>
                                + Add Main video
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
                                            value={channels.video}
                                            onChange={handleVideoChange}
                                        />
                                    </div>
                                    <div className="form-group mt-1">
                                        <label className="form-label"><b>Video Image</b></label>
                                        <input type="file" className="form-control"
                                            name='image'
                                            value={channels.image}
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
                                <div className='mt-4'>
                                    <Card style={{ width: '13rem' }}>
                                        <Card.Img variant="top" src="/ranban.jpg" />
                                        <Card.Body>
                                            <Card.Title className='title d-flex flex-row justify-content-center align-items-center'>

                                            </Card.Title>
                                            <div className='mt-3 d-flex flex-row justify-content-center align-items-center g-3 icon'>
                                                <FiEdit className='fs-4'
                                                    // onClick={() => { setModalData(channel); setModalShow(true); }} 
                                                    style={{ color: 'green', cursor: "pointer" }} />
                                                <MdDelete
                                                    className='fs-3'
                                                    style={{ color: 'red', cursor: 'pointer' }}
                                                // onClick={() => deleteChannel(channel.id)}
                                                />
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Slider>
                        </div>
                    </Tab>
                    <Tab eventKey="tab2" title="Categories">
                        <div className='mt-4'>
                            <Button className="button-17" onClick={handleShow2}>
                                + Add Categories
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
                        <section className='first-half mt-4'>
                            <ul>
                                {channels.map((channel, index) => (
                                    <li key={index}>{channel}</li>
                                ))}
                            </ul>

                        </section>
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}

export default ChannelInfo