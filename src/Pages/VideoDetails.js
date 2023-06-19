// import React from 'react';
// import PlyrPlayer from '../Child/PlyrPlayer';
// import 'plyr/dist/plyr.css';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';

// function VideoDetails() {
//     const options = {
//         controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen', 'pip'],
//         fullscreen: { enabled: true, fallback: true },
//         pip: { enabled: true },
//     };

//     return (
//         <div>
//             <div>
//                 <h4>Video Details</h4>
//             </div>
//             <hr />
//             <div>
//                 <div className="form-group mt-3">
//                     <label className="form-label"><b>Video Name</b></label>
//                     <input type="text" className="form-control"
//                     />
//                 </div>
//                 <div className="form-group mt-3">
//                     <label className="form-label"><b>Video Name</b></label>
//                     <input type="text" className="form-control"
//                     />
//                 </div>
//                 <div class="form-group mt-3">
//                     <label for="exampleFormControlSelect1"><b>Video Status</b></label>
//                     <Form.Select aria-label="Default select example" className='mt-2'>
//                         <option value="1">Public</option>
//                         <option value="2">Private</option>
//                     </Form.Select>
//                 </div>
//                 {/* <div class="form-group mt-3">
//                     <label for="exampleFormControlSelect1"><b>Video Type</b></label>
//                     <Form.Select aria-label="Default select example" className='mt-2'>
//                         <option value="1">Free</option>
//                         <option value="2">Paid</option>
//                     </Form.Select>
//                     <div className="additional-options">
//                         <div className="form-group mt-3">
//                             <label className="form-label"><b>Videe price</b></label>
//                             <input type="text" className="form-control"
//                             />
//                         </div>
//                         <div className="form-group mt-3">
//                             <label className="form-label"><b>subscription days</b></label>
//                             <input type="text" className="form-control"
//                             />
//                         </div>
//                     </div>
//                 </div>  */}
//                 <div class="form-group mt-3">
//                     <label for="exampleFormControlSelect1"><b>Video Type</b></label>
//                     <Form.Select aria-label="Default select example" className='mt-2' id="video-type-select">
//                         <option value="1">Free</option>
//                         <option value="2">Paid</option>
//                     </Form.Select>
//                     <div class="additional-options" id="additional-options-paid">
//                     <div className="form-group mt-3">
//                         <label className="form-label"><b>Video price</b></label>
//                         <input type="text" className="form-control"
//                         />
//                     </div>
//                     <div className="form-group mt-3">
//                         <label className="form-label"><b>subscription days</b></label>
//                         <input type="text" className="form-control"
//                         />
//                     </div>
//                 </div>
//                 </div>
             
//             </div>
//             <div className='video mt-4'>
//                 <PlyrPlayer src="/damdam.mp4" options={options} className='video' />
//             </div>
//             <div className="form-group mt-3">
//                 <label className="form-label"><b>Video</b></label>
//                 <input type="file" className="form-control"
//                 />
//             </div>
//             <div className="form-group mt-3">
//                 <label className="form-label"><b>Video Image</b></label>
//                 <input type="file" className="form-control"
//                 />
//             </div>
//             <Button className="button-17 mt-4">
//                 Submit
//             </Button>
//         </div>
//     );
// }

// export default VideoDetails;
