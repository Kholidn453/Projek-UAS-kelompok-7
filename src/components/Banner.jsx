import React from "react";
import { Container, Carousel } from "react-bootstrap";
import banner1 from "../assets/images/banner1.png";
import banner2 from "../assets/images/banner2.png";
import banner3 from "../assets/images/banner3.png";

function Banner() {
  return (
    <Container style={{ marginTop: "100px" }}>
      <Carousel interval={3000} fade>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={banner1}
            alt="Slide 1"
            style={{ borderRadius: "12px" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={banner2}
            alt="Slide 2"
            style={{ borderRadius: "12px" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={banner3}
            alt="Slide 3"
            style={{ borderRadius: "12px" }}
          />
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}

export default Banner;
