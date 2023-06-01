import React, { useRef, useEffect } from "react";
import $ from 'jquery';
import 'slick-carousel/slick/slick.js';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function Slider(props) {
  const sliderRef = useRef(null);

  useEffect(() => {
    $(sliderRef.current).slick({
      arrows: true,
      prevArrow: "<button type='button' class='slick-prev'>Previous</button>",
      nextArrow: "<button type='button' class='slick-next'>Next</button>",
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  }, []);

  return (
    <div className="slider-container position-relative " ref={sliderRef} >
      {props.channels.map((channel, index) => (
        <div key={index} >
          <div className="card ">
            <div className="card-body">
              <h5 className="card-title">{channel.title}</h5>
              <p className="card-text">{channel.description}</p>
            </div>
          </div>
        </div>
      ))}
      <button type="button" className="slick-prev">Previous</button>
      <button type="button" className="slick-next">Next</button>
    </div>
  );
}

export default Slider;
