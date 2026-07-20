import React, { useContext } from 'react';

import Carousel from 'react-bootstrap/Carousel';
// import ExampleCarouselImage from 'components/ExampleCarouselImage';
import Image from "react-bootstrap/Image";
import img1 from '../assets/img/carousel/bonus_mar24_1320x440_ua.webp';
import img2 from '../assets/img/carousel/drons_mar24_1320x440_ua.webp';
import img3 from '../assets/img/carousel/laptops_sale_mar24_1320x440_ua.webp';
import img4 from '../assets/img/carousel/phones_sale_mar24_1320x440_ua.webp';
import img5 from '../assets/img/carousel/samsung_frame_and_soundbar-sale_mar24_1320x440.webp';
import img6 from '../assets/img/carousel/samsung_s24_sale_apr24_1320x440.webp';
import img7 from '../assets/img/carousel/ukrposhta-delivery_free_mar24_1320x440_ua.webp';



function SliderCarousel() {
     return (
          <Carousel>
               <Carousel.Item interval={1000}>
                    <img src={img1} />
               </Carousel.Item>
               <Carousel.Item interval={1000}>
                    <img src={img2} />
               </Carousel.Item>
               <Carousel.Item interval={500}>
                    <img src={img3} />
               </Carousel.Item>
               <Carousel.Item interval={500}>
                    <img src={img4} />
               </Carousel.Item>
               <Carousel.Item interval={500}>
                    <img src={img5} />
               </Carousel.Item>
               <Carousel.Item interval={500}>
                    <img src={img6} />
               </Carousel.Item>
               <Carousel.Item interval={500}>
                    <img src={img7} />
               </Carousel.Item>
          </Carousel>
     );
}

export default SliderCarousel;