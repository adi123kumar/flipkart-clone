import "./Banner.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function Banner() {
  const banners = [
    "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/1338bd4fc60390d8.jpg?q=80",
    "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/74f0ad81e44e6e6f.jpg?q=80"
  ];

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    arrows: true,
    slidesToScroll: 1
  };

  return (
    <div className="banner-container">
      <Slider {...settings}>
        {banners.map((img, i) => (
          <div key={i}>
            <img src={img} alt={`banner-${i}`} className="banner-img" />
          </div>
        ))}
      </Slider>
    </div>
  );
}
