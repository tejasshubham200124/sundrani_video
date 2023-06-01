import React from 'react'
import { AiTwotoneEdit } from 'react-icons/ai'
import { MdDeleteOutline } from 'react-icons/md'
import { Link } from 'react-router-dom';
const ViewBhaktiChannel = () => {
    return (
        <div>
            <div>
                <h3>Popular songs</h3>
            </div>
            <div class="card mt-3">
                <div class="card-body">
                    <div className='content d-flex flex-row'>
                        <div className='img'>
                            <img src='/damdam.jpg' />
                        </div>
                        <div className='main-content'>
                                <p>
                                    Dam dam damru bajake || Hiresh Sinha || lord Shiva | Bhakti Song
                                </p>
                        </div>
                        <div className='edit'>
                            <div className='mt-5 d-flex flex-row justify-content-center align-items-center g-5 icon2'>
                            <Link to='/admin/VideoDetails'>  <AiTwotoneEdit className='fs-3' style={{ color: 'blue' }} /></Link>
                                <MdDeleteOutline className='fs-3' style={{ color: 'red' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card mt-3">
                <div class="card-body">
                    <div className='content d-flex flex-row'>
                        <div className='img'>
                            <img src='/damdam.jpg' />
                        </div>
                        <div className='main-content'>
                                <p>
                                Bhola Har Ge || Dakalu Yadav || Lord Shiva Sawan Special
                                    Chattisgarhi Bhakti <br />Song 
                                </p>
                        </div>
                        <div className='edit'>
                            <div className='mt-5 d-flex flex-row justify-content-center align-items-center g-5 icon2'>
                              <AiTwotoneEdit className='fs-3' style={{ color: 'blue' }} />
                                <MdDeleteOutline className='fs-3' style={{ color: 'red' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card mt-3">
                <div class="card-body">
                    <div className='content d-flex flex-row'>
                        <div className='img'>
                            <img src='/damdam.jpg' />
                        </div>
                        <div className='main-content'>
                                <p>
                                   Tor Mahima He Mahan || Garima Diwakar || Lord Shiva Sawan Special || CG Bhakti Song
                                </p>
                        </div>
                        <div className='edit'>
                            <div className='mt-5 d-flex flex-row justify-content-center align-items-center g-5 icon2'>
                                <AiTwotoneEdit className='fs-3' style={{ color: 'blue' }} />
                                <MdDeleteOutline className='fs-3' style={{ color: 'red' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card mt-3">
                <div class="card-body">
                    <div className='content d-flex flex-row'>
                        <div className='img'>
                            <img src='/damdam.jpg' />
                        </div>
                        <div className='main-content'>
                                <p>
                                   Shiv Shankar Bhole Bhandari  || Vivek Sharma || Lord Shiva Sawan Special || CG Bhakti Song
                                </p>
                        </div>
                        <div className='edit'>
                            <div className='mt-5 d-flex flex-row justify-content-center align-items-center g-5 icon2'>
                                <AiTwotoneEdit className='fs-3' style={{ color: 'blue' }} />
                                <MdDeleteOutline className='fs-3' style={{ color: 'red' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewBhaktiChannel