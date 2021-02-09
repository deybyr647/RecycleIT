import Head from 'next/head';
import { Container, Row, Col, Jumbotron, Image, Carousel, Accordion, Card, Button, AccordionContext, useAccordionToggle } from 'react-bootstrap';
import { BiRecycle } from 'react-icons/bi';

import etcStyles from '../styles/etc.module.css';

import Navigation from '../components/navbar';
import Footer from '../components/footer';
import { useContext } from 'react';

interface Toggle{
  children: React.ReactNode,
  eventKey: string,
  callback?: Function
}

const AwareToggle = ({children, eventKey, callback}: Toggle) => {
  const currentEventKey = useContext(AccordionContext);
  const decoratedOnClick = useAccordionToggle(eventKey, () => callback && callback(eventKey));
  const isCurrentEventKey: boolean = currentEventKey === eventKey;

  return(
    <Button
      variant={isCurrentEventKey ? "info" : "light"}
      onClick={decoratedOnClick}
    >
      {children}
    </Button>
  );
}

interface HomeContent{
  children: React.ReactNode
}

const HomeContent = ({children}: HomeContent) => {
  return(
    <Container className=''>
      {children}
      <Row>
        <Col>
          <Jumbotron className='d-flex flex-column align-items-center text-center'>
            <Image src='https://images.unsplash.com/photo-1604187351574-c75ca79f5807?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80' alt='Recycling Bin' className='w-75 shadow-lg' rounded/>
            <Container className='d-flex flex-row justify-content-between text-center mt-3'>
              <BiRecycle size={52} className={etcStyles.faRecycle}/>
              <h1 className='mx-3'>RecycleIT</h1>
              <BiRecycle size={52} className={etcStyles.faRecycle}/>
            </Container>

            <p className='mt-2'>A new, simple way to recycling</p>
          </Jumbotron>
        </Col>
      </Row>

      <Row className=''>
        <Col>
          <Carousel>
            <Carousel.Item>
              <Image src='https://images.unsplash.com/photo-1604187351574-c75ca79f5807?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80' className='d-block w-100'/>
            </Carousel.Item>

            <Carousel.Item>
              <Image src='https://images.unsplash.com/photo-1513615040015-9ab281b0f9e7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80' className='d-block w-100'/>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>

      <Row className='mt-4'>
        <Col>
          <Jumbotron>
            <h3 className='text-center'>The Ins &amp; Outs of Recycling</h3>
            <Accordion className='mt-3'>
              <Card>
                <Card.Header>
                  <AwareToggle eventKey='0'>What Is Recycling?</AwareToggle>
                </Card.Header>

                <Accordion.Collapse eventKey='0'>
                  <>
                    <Card.Img src='https://images.unsplash.com/photo-1481761289552-381112059e05?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1161&q=80'/>
                    <Card.Body>
                      Simply put, recycling is the process of converting waste materials into new materials! Of course,
                      there's more to it than just creating new from the old. The process is also beneficial towards the surrounding environment
                      in many ways!
                    </Card.Body>
                  </>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Jumbotron>
        </Col>

        <Col>
          <Jumbotron>
            <h3 className='text-center'>Ways To Contribute</h3>
            <Accordion className='mt-3'>
              <Card>
                <Card.Header>
                  <AwareToggle eventKey='0'>Recycling Guidelines</AwareToggle>
                </Card.Header>

                <Accordion.Collapse eventKey='0'>
                  <>
                    <Card.Img src='https://pixfeeds.com/images/save-nature/1280-508877770-different-colored-recycle-waste-bins.jpg'/>
                    <Card.Body>
                      One of the key steps in the journey towards contributing is learning about reycling guidelines!
                      You can head over to the EPA's (Environment Protection Agency) website to learn the basics! You may
                      also want to search the web for guidelines specific to your community!
                    </Card.Body>
                  </>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  )
}


const Home = () => {
  return(
    <>
      <Navigation/>
      <HomeContent>
        <Head>
          <title>RecycleIT Home</title>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
            integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
            crossOrigin="anonymous"
          />
        </Head>
      </HomeContent>
      <Footer/>
    </>
  );
}

export default Home;
