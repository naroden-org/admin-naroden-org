// import node module libraries
import Link from 'next/link';
import { ProgressBar, Col, Row, Card, Table, Image, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react'

const News = () => {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        fetch('https://api.naroden.org/v1/feed', {
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

    if (isLoading) return <p>Loading...</p>

    return (
        <Row className="mt-6">
            <Col md={12} xs={12}>
                <Card>
                    <Table responsive className="text-nowrap mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Номер</th>
                                <th>Заглавие</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.feed.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="align-middle">
                                             {item.id}
                                        </td>
                                        <td className="align-middle">{item.title}</td>
                                        <td className="align-middle">
                                            <Link href={`/admin-naroden-org/news/edit/${item.id}`} className="btn btn-success me-1">Редактирай</Link>
                                            <Button variant="danger" className="me-1">Архивирай</Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <Card.Footer className="bg-white text-center">
                        <Link href="#" className="link-primary">TODO: navigation</Link>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    )
}

export default News