import React from "react";
import SliderSlick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slider1 from "../images/products/spacejoy.jpg";
import slider2 from "../images/products/michael-warf.jpg";
import slider3 from "../images/products/nathan-fertig.jpg";
import slider4 from "../images/products/toa-heftiba.jpg";

const Slider = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <>
            <section className="hero">
                <div className="hero-container">
                    <SliderSlick {...settings}>
                        <div>
                            <img src="https://cdn.cody.mn/img/260624/1920x0xwebp/web2.png?h=4ef1aa3a49ec22862e90935a08f476f976e741b4" />
                        </div>
                        <div>
                            <img src="https://cdn.cody.mn/img/262157/1920x0xwebp/Web_banner_main_michel_amazonka.jpg?h=4ef1aa3a49ec22862e90935a08f476f976e741b4" />
                        </div>
                        <div>
                            <img src="https://cdn.cody.mn/img/259615/1920x0xwebp/Web_banner_main_next.png?h=4ef1aa3a49ec22862e90935a08f476f976e741b4" />
                        </div>
                        <div>
                            <img src="https://cdn.cody.mn/img/260698/1920x0xwebp/Web_banner_main_parigi.jpg?h=4ef1aa3a49ec22862e90935a08f476f976e741b4" />
                        </div>
                    </SliderSlick>
                </div>
            </section>
        </>
    );
};

export default Slider;
