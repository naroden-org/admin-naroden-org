'use client'
// import node module libraries
import { Container } from 'react-bootstrap';
import Link from 'next/link';
// import widget as custom components
import { PageHeading } from 'widgets';

import { Col, Row, Form, Card, Button, Image } from 'react-bootstrap';
import { FormSelect, DropFiles } from 'widgets';
import { useState, useEffect } from 'react'
import { useContext } from "react"

export default function EditNews({ params }) {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)

    const [inputs, setInputs] = useState([{ key: '', value: '' }]);

     // Function to handle change in input field
    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const list = [...inputs];
        list[index][name] = value;
        setInputs(list);
    };

    // Function to handle the addition of a new input field
    const handleAddClick = () => {
        setInputs([...inputs, { key: '', value: '' }]);
    };

    // Function to handle the removal of an input field
    const handleRemoveClick = index => {
        const list = [...inputs];
        list.splice(index, 1);
        setInputs(list);
    };

    useEffect(() => {
        fetch('https://api.naroden.org/v1/feed/' + params.id, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2MWZveTI5bDJxbHplaTdsOTl2OCIsInJvbGUiOiJVU0VSIiwiZXhwIjoxNzMxMzYwMTI2LCJpYXQiOjE3Mjg3NjgxMjZ9.WyOhW2MK4Sab0LAixsz349zFsJBeC9LiKzAoUyQVcBQ',
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify({ query }),
        })
        .then((res) => res.json())
        .then((data) => {
          setData(data)
          setLoading(false)
        })
    }, [])

  const countryOptions = [
    { value: 'India', label: 'India' },
    { value: 'US', label: 'US' },
    { value: 'UK', label: 'UK' },
    { value: 'UAE', label: 'UAE' }
  ];

    if (isLoading) return (
      <Container fluid className="p-6">
        <PageHeading heading="Народни новини" />
        <p>Loading...</p>
      </Container>
   )

    return (
  <Container fluid className="p-6">
    <PageHeading heading="Редактирай народната новина" />
    <Row className="mb-8">
        <Card>
          {/* card body */}
          <Card.Body>
            {/* col */}
            <div>
              <Form>
                <Row className="mb-3">
                  <Form.Label className="col-sm-4 col-form-label form-label">Номер</Form.Label>
                  <Col md={8} xs={12}>
                    <Form.Label className="col-sm-4 col-form-label form-label">{params.id}</Form.Label>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Form.Label className="col-sm-4 col-form-label form-label" htmlFor="title">Заглавие</Form.Label>
                  <Col md={8} xs={12}>
                    <Form.Control type="text" placeholder="Заглавие" id="title" required />
                  </Col>
                </Row>
                {/* row */}
                <Row className="mb-3">
                <Form.Label className="col-sm-4 col-form-label form-label" htmlFor="image">Картинка (линк)</Form.Label>
                  <Col md={8} xs={12}>
                    <Form.Control type="text" placeholder="url" id="image" required />
                  </Col>
                </Row>
                {/* row */}
                <Row className="mb-3">
                  <Form.Label className="col-sm-4">Бутони</Form.Label>
                  <Col md={8} xs={12}>
                    {inputs.map((input, i) => (
                                        <Row className="mb-3" key={i}>
                                          <Col sm={2} className="mb-3 mb-lg-0">
                                            <Form.Control name='key' as={FormSelect} placeholder="Тип" id="country" onChange={event => handleInputChange(i, event)} value={input.key} options={countryOptions} />
                                          </Col>
                                          <Col sm={5} className="mb-3 mb-lg-0">
                                            <Form.Control name='value' value={input.value} type="text" onChange={event => handleInputChange(i, event)} required />
                                          </Col>
                                          <Col sm={1}>
                                            <Button onClick={() => handleRemoveClick(i)} type="button" className="btn btn-danger me-1">Премахни</Button>
                                          </Col>
                                        </Row>

                    ))}
                  </Col>
                </Row>

                {/* Address Line One */}
                <Row className="mb-3">
                  <Form.Label className="col-sm-4" htmlFor="text">Текст</Form.Label>
                  <Col md={8} xs={12}>
                    <Form.Control type="textarea" placeholder="текст" id="text" required />
                  </Col>
                </Row>

                {/* Zip code */}
                <Row className="align-items-center">
                  <Col md={{ offset: 4, span: 8 }} xs={12} className="mt-4">
                    <Button variant="outline-primary" onClick={handleAddClick} type="button" className="me-1">Добави бутон</Button>
                    <Button variant="primary" type="submit" className="me-1 btn btn-success">Запази промените</Button>
                    <Link href={`/news`} className="btn btn-danger me-1">Обратно</Link>
                  </Col>
                </Row>
              </Form>
            </div>
          </Card.Body>
        </Card>

    </Row>
  </Container>
    )
}