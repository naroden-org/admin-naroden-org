'use client'
// import node module libraries
import { Container } from 'react-bootstrap';

// import widget as custom components
import { PageHeading } from 'widgets'

// import sub components
import { News } from 'sub-components'

const ViewAllNews = () => {
  return (
    <Container fluid className="p-6">

      <PageHeading heading="Народни новини" />

      <News />

    </Container>
  )
}

export default ViewAllNews