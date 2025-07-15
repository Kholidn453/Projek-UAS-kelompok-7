import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import laptop1 from "../assets/images/product/laptop1.png";
import laptop2 from "../assets/images/product/laptop2.png";
import iphone from "../assets/images/product/iphone.png";
import samsung from "../assets/images/product/samsung.png";
import baju from "../assets/images/product/baju.png";
import tas from "../assets/images/product/tas.png";
import pembersih from "../assets/images/product/pembersih-hidung.png";
import kabel from "../assets/images/product/kabel-data.png";

const products = [
  {
    name: "Lenovo Ideapad Slim 1 ryzen 3",
    category: "Laptop & PC",
    img: laptop1,
    description:
      "Laptop tangguh dengan layar jernih, cocok untuk pekerjaan harian maupun multimedia ringan.",
    price: "5.000.000",
  },
  {
    name: "ASUS Vivobook",
    category: "Laptop & PC",
    img: laptop2,
    description:
      "Laptop stylish dengan performa andal, ideal untuk belajar, bekerja, dan hiburan. ",
    price: "6.500.000",
  },
  {
    name: "iPhone 13",
    category: "Smartphone",
    img: iphone,
    description:
      "Smartphone premium dengan kamera canggih dan performa cepat untuk kebutuhan sehari-hari.",
    price: "11.000.000",
  },
  {
    name: "SAMSUNG A531",
    category: "Smartphone",
    img: samsung,
    description:
      "Ponsel Android dengan desain ramping dan fitur lengkap untuk aktivitas digitalmu.",
    price: "2.500.000",
  },
  {
    name: "Baju Wanita Simple",
    category: "Fashion",
    img: baju,
    description:
      "Gaun kasual elegan dengan model simpel dan bahan nyaman untuk tampilan sehari-hari.",
    price: "150.000",
  },
  {
    name: "Tas Kece",
    category: "Fashion",
    img: tas,
    description:
      "Tas fashion modis yang cocok digunakan untuk acara formal maupun santai.",
    price: "250.000",
  },
  {
    name: "Pembersih Hidung",
    category: "Elektronik",
    img: pembersih,
    description:
      "Alat pembersih hidung elektrik yang higienis dan praktis untuk perawatan diri.",
    price: "60.000",
  },
  {
    name: "Kabel Data Type C",
    category: "Accessories",
    img: kabel,
    description:
      "Kabel data Type-C dengan fitur rotasi 360°, mendukung pengisian cepat dan transfer data efisien.",
    price: "35.000",
  },
];

function ProductList() {
  return (
    <Container className="my-5">
      <h3 className="text-center mb-4">All Products</h3>
      <Form className="d-flex justify-content-center mb-5">
        <Form.Control
          type="text"
          placeholder="search something..."
          style={{ width: "750px", borderRadius: 0 }}
        />
        <Button
          className="text-white"
          variant="warning"
          style={{ borderRadius: 0 }}
        >
          Search
        </Button>
      </Form>
      <Row>
        {products.map((product, idx) => (
          <Col md={3} sm={6} xs={12} key={idx} className="mb-4">
            <Card>
              <Card.Img variant="top" src={product.img} />
              <Card.Body>
                <Card.Subtitle className="mb-1 text-muted">
                  {product.category}
                </Card.Subtitle>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <Card.Title className="mb-0">Rp. {product.price}</Card.Title>
                  <Button
                    className="custom-hover-white"
                    variant="outline-warning"
                    style={{ borderRadius: 0 }}
                  >
                    Buy
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;
