import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try { 
      const res = await fetch("http://localhost/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error(`Server error ${res.status}`);
      }

      const data = await res.json();

      if (data.status === "success") {
        const user = { name: data.name };
        localStorage.setItem("user", JSON.stringify(user));
        if (setUser) setUser(user);

        // Simpan penanda agar saat login lagi muncul welcome
        localStorage.setItem("justLoggedIn", "true");

        navigate("/home");
      } else {
        alert(data.message || "Login gagal. Silakan cek kembali email & password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Terjadi kesalahan saat login. Pastikan server aktif dan login.php bisa diakses.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={5}>
          <Card className="p-4 shadow">
            <Card.Body>
              <h3 className="text-center mb-4">Creative Store</h3>
              <h5 className="text-center mb-3 text-muted">Login to your account</h5>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="warning" type="submit" className="text-white" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </div>
              </Form>

              <p className="text-center mt-3 text-muted">
                Don't have an account? <a href="/signup">Sign up here</a>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
