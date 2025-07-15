import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";

const categories = [
  { name: "Skin Care", img: "/src/assets/images/categories/skincare.png" },
  { name: "Laptop & PC", img: "/src/assets/images/categories/laptop.png" },
  { name: "Smarphone", img: "/src/assets/images/categories/smartphone.png" },
  { name: "Fashion", img: "/src/assets/images/categories/fashion.png" },
  { name: "Sepatu", img: "/src/assets/images/categories/sepatu.png" },
  { name: "Elektronik", img: "/src/assets/images/categories/elektronik.png" },
];

function Categories() {
  return (
    <Container className="my-4">
      <Button
        variant="warning"
        className="mb-3 text-white"
        style={{ borderRadius: 0 }}
      >
        Product Category
      </Button>
      <Row className="justify-content-center text-center">
        {categories.map((cat, idx) => (
          <Col xs={4} sm={3} md={2} key={idx} className="mb-3">
            <div
              style={{
                backgroundColor: "#f9f9f9",
                borderRadius: "10px",
                padding: "20px 10px",
              }}
            >
              <Image src={cat.img} roundedCircle fluid />
              <p className="mt-2 fw-bold" style={{ color: "#ffcc00" }}>
                {cat.name}
              </p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Categories;
