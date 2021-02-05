import Head from 'next/head';
import {Container, Row, Col, Jumbotron, Image} from 'react-bootstrap';
import {BiRecycle} from 'react-icons/bi';

import etcStyles from '../styles/etc.module.css';

import Navigation from '../components/navbar';
import Footer from '../components/footer';

const HomeContent = () => {
  return(
    <Container className='mt-4'>
      <Row>
        <Col>
          <Jumbotron className='d-flex flex-column align-items-center text-center'>
            {/*<Image src='https://images.unsplash.com/photo-1604187351574-c75ca79f5807?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80' alt='Recycling Bin' className='w-75 shadow-lg' rounded/>*/}
            <Container className='d-flex flex-row justify-content-between text-center'>
              <BiRecycle size={52} className={etcStyles.faRecycle}/>
              <h1>RecycleIT</h1>
              <BiRecycle size={52} className={etcStyles.faRecycle}/>
            </Container>

            <p className='mt-2'>A new, simple way to recycling</p>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  )
}


const Home = () => {
  return(
    <>
      <Head>
        <title>RecycleIT</title>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
          integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
          crossOrigin="anonymous"
        />
      </Head>

      <Navigation/>
      <HomeContent/>
      <Footer/>
    </>
  )
}

export default Home;
