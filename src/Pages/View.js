import React, { useState, useEffect } from 'react'
import { FiEdit } from 'react-icons/fi'
import { MdDelete } from 'react-icons/md'
import Card from 'react-bootstrap/Card';
import { Tooltip } from 'antd';
import { useParams } from 'react-router';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { lazy, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import AWS from 'aws-sdk';
import config from '../Pages/awsconfig';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
const ChannelInfoChild = lazy(() => import('../Child/ChannelInfoChild'));

const View = () => {

    const [category, setCategory] = useState([])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [editModalShow, setEditModalShow] = useState(false);
    const [channels, setChannels] = useState([])
    const [selectedImage, setSelectedImage] = useState(null)
    const [topic_name, setTopic_name] = useState()
    const [topic_desc, setTopic_desc] = useState()
    const [selectedVideo, setSelectedVideo] = useState()
    const [video_status, setVideo_status] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const { category_id } = useParams()

    const handleClose3 = async () => {
        try {
            const response = await fetch('https://apidev.sundranifilms.co.in/admin/insert_video', {
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
                    category_id: category_id
                }),
            });
            if (response.ok) {
                toast.success(' New  video added Successfully', {
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
                toast.error('Failed to add Video');
            }
            const data = await response.json();
            console.log('Add Main video:', data);
            handleClose();
        } catch (error) {
            console.error('Error:', error);
        }
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
            setIsLoading(true);
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
                setIsLoading(false);
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

    const openEditModal = (video) => {
        setEditModalShow(true);
        setModalData(video);
    };

    const handleUpdateVideo = (updatedVideo) => {
        console.log(updatedVideo);
    };

    useEffect(() => {
        axios.post(
            'https://apidev.sundranifilms.co.in/admin/get_video_by_categories_id',
            { category_id: category_id },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(response => {
                setCategory(response.data.videos);
            })
            .catch(error => {
                console.error(error);
            });
    }, [category_id]);

   

    const fetchData = async (categoryId, videoId) => {
        try {
            const response = await axios.post('https://apidev.sundranifilms.co.in/admin/get_video_by_categories_id', {
                category_id: categoryId,
            });
            const videoData = response.data.find((video) => video.id === videoId);
            setModalData(videoData);
            setEditModalShow(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const deleteChannel = (videoId) => {
        swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this video !",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then(async (willDelete) => {
          if (willDelete) {
            try {
              const response = await fetch("https://apidev.sundranifilms.co.in/admin/delete_video_id", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "id": videoId }),
              });
       
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

    const handleFetchData = (categoryId, videoId) => {
        fetchData(categoryId, videoId);
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
                Add Video
            </Button>
            <Modal show={show} onHide={handleClose} className="custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Video Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group mt-1">
                        <label className="form-label"><b>Video Name</b></label>
                        <input
                            type="text "
                            className="form-control"
                            name='topic_name' value={topic_name}
                            onChange={(e) => setTopic_name(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-1">
                        <div class="mb-3">
                            <label for="exampleFormControlTextarea1" class="form-label"><b>Video Description</b></label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                                name='topic_desc' value={topic_desc}
                                onChange={(e) => setTopic_desc(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                    <div className="form-group mt-1">
                        <label for="exampleFormControlSelect1"><b>Video Status</b></label>
                        <Form.Select aria-label="Default select example" name="video_satus"
                            onChange={(e) => setVideo_status(e.target.value)}
                            value={video_status}
                        >
                            <option value="1">Public</option>
                            <option value="2">Private</option>
                            <option value="3">0</option>
                        </Form.Select>
                    </div>
                    <div className="row mt-1">
                        <div className="col">
                            <div className="form-group mt-1">
                                <label className="form-label"><b>Video</b></label>
                                <input type="file" className="form-control"
                                    name='video'
                                    value={channels.video_file}
                                    onChange={handleVideoChange}
                                />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group mt-1">
                                <label className="form-label"><b>Video Image </b></label>
                                <input type="file" className="form-control"
                                    name='image'
                                    value={channels.coverImage}
                                    onChange={handleImageChange}
                                />
                            </div>
                            {isLoading && (
                                <div className="loader-container">
                                    <div className="loader" />
                                </div>
                            )}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary"
                        onClick={handleClose3}
                    >
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
            <section className='first-half mt-4'>
                <div key={category.category_id}>
                    <div className='row'>
                        {category.map((video) => (
                            <div key={video.id} className='col-md-4'>
                                <div className='video-item'>
                                    <div className='category-video-img'>
                                        <img src={`https://sarsundrani.s3.ap-south-1.amazonaws.com/${video.image}`} alt={video.image} loading="lazy"/>
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
                                        <div className='d-flex flex-row justify-content-center align-items-center g-2 icon' style={{ paddingBottom: "5px" }}>
                                            <FiEdit className='fs-5' onClick={() => openEditModal(video)} style={{ color: 'green', cursor: 'pointer' }} />
                                            <MdDelete className='fs-4' style={{ color: 'red', cursor: 'pointer' }}
                                             onClick={() => deleteChannel(video.id)}
                                            />
                                        </div>
                                    </Card.Body>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Suspense fallback={<div>Loading...</div>}>
                {modalData && (
                    <ChannelInfoChild
                        show={editModalShow}
                        onHide={() => {
                            setEditModalShow(false);
                            setModalData(null);
                        }}
                        video={modalData}
                        updateVideo={handleUpdateVideo}
                    />
                )}
            </Suspense>
        </div>
    )
}

export default View