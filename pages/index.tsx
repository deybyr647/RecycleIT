import { useContext } from "react";

import { Container, Row, Col, Jumbotron, Image, Carousel, Accordion, Card, Button, AccordionContext, useAccordionToggle } from "react-bootstrap";
import { BiRecycle } from "react-icons/bi";

import styles from "../styles/index.module.css";
import etcStyles from "../styles/etc.module.css";

import MetaData from "../components/Metadata";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

interface ContextAwareToggleProps {
  children: React.ReactNode,
  eventKey: string,
  onToggle?: Function
};

const ContextAwareToggle = ({children, eventKey, onToggle}: ContextAwareToggleProps) => {
  const currentEventKey = useContext(AccordionContext);
  const decoratedOnClick = useAccordionToggle(eventKey, () => onToggle && onToggle(eventKey));
  const isCurrentEventKey: boolean = currentEventKey === eventKey;

  return (
    <Button
      variant={isCurrentEventKey ? "info" : ""}
      onClick={decoratedOnClick}
      className={`${styles.buttonTrigger} text-white`}
    >
      {children}
    </Button>
  );
};

const HomeContent = () => {
  return (
    <Container fluid>
      <Row className="mt-1">
        <Col>
          <Jumbotron className={`${styles.contentContainer} shadow`}>
            <h3 className="text-center">The Ins &amp; Outs of Recycling</h3>
            
            <Card className="mt-3">
              <Card.Header className="justify-content-center d-flex">
                <Button 
                  variant="info" 
                  className={styles.buttonTrigger}
                >
                  What Is Recycling?
                </Button>
              </Card.Header>

                <Card.Img 
                  src="https://images.unsplash.com/photo-1481761289552-381112059e05?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1161&q=80"
                />

                <Card.Body>
                  Simply put, recycling is the process of converting waste materials into new materials! 
                  Of course, there's more to it than just creating new from the old. 
                  The process is also beneficial towards the surrounding environment in many ways!
                </Card.Body>
            </Card>
            
            <Accordion className="mt-3">
              <Card>
                <Card.Header className="justify-content-center d-flex">
                  <ContextAwareToggle eventKey="0">What Are The Benefits?</ContextAwareToggle>
                </Card.Header>

                <Accordion.Collapse eventKey="0">
                  <>

                    <Card.Img 
                      src="https://images.unsplash.com/photo-1481761289552-381112059e05?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1161&q=80"
                    />

                    <Card.Body>
                      Simply put, recycling is the process of converting waste materials into new materials! 
                      Of course, there's more to it than just creating new from the old. 
                      The process is also beneficial towards the surrounding environment in many ways!
                    </Card.Body>

                  </>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Jumbotron>
        </Col>

        <Col md={12} lg={4} xl={6} className="mb-4 order-first order-lg-0">
          <Row className="justify-content-center d-flex flex-column">
            <Col>
              <Card className="shadow border-0 w-100">
                <Card.Img
                  src="https://images.unsplash.com/photo-1604187351574-c75ca79f5807?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" 
                  className="rounded"
                  alt="Recycling Bin"
                />

                <Card.ImgOverlay className={`rounded d-flex align-items-end ${styles.homeOverlay}`}>
                  <Card.Body className="text-white">
                      <Card.Title>RecycleIT</Card.Title>
                      <Card.Text>Making Recycling Easy</Card.Text>
                  </Card.Body>

                  <BiRecycle size={36} className={etcStyles.faRecycle} style={{color: "white"}}/>
                </Card.ImgOverlay>
              </Card>
            </Col>

            <Col className="mt-3">
              <Carousel>
                <Carousel.Item>
                  <Image 
                    src="https://static01.nyt.com/images/2020/03/12/nyregion/12nygarbage/merlin_164230761_a65635a0-b47e-45d6-8c32-759ab0ace1af-jumbo.jpg?quality=90&auto=webp" 
                    alt="First Slide" 
                    className="w-100"
                  />

                  <Card.ImgOverlay className={styles.slideOverlay}/>

                  <Carousel.Caption>
                    <a 
                      href="https://www.nytimes.com/2020/03/13/nyregion/ny-garbage-recycling.html?auth=login-google&searchResultPosition=34"
                      className={styles.links}
                    >
                      Finally, a Plan for New York’s Sidewalk Trash Bag Mountains
                    </a>
                  </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                  <Image 
                    src="https://static01.nyt.com/images/2020/09/29/world/29plastic/29plastic-jumbo.jpg?quality=90&auto=webp" 
                    alt="Second Slide" 
                    className="w-100"
                  />

                  <Card.ImgOverlay className={styles.slideOverlay}/>

                  <Carousel.Caption>
                    <a
                      href="https://www.nytimes.com/2020/09/29/world/europe/plastic-recycling-super-enzyme.html?searchResultPosition=16"
                      className={styles.links}
                    >
                      ‘Super-Enzyme’ Speeds Up Breakdown of Plastic, Researchers Say
                    </a>
                  </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                  <Image 
                    src="https://static01.nyt.com/images/2020/10/30/climate/30CLI-PLASTIC/merlin_173323752_0fb6dd4e-6cda-4b36-8939-cf568e47099e-jumbo.jpg?quality=90&auto=webp" 
                    alt="Third Slide" 
                    className="w-100"
                  />

                  <Card.ImgOverlay className={styles.slideOverlay}/>

                  <Carousel.Caption>
                    <a
                      href="https://www.nytimes.com/2020/10/30/climate/plastic-pollution-oceans.html?searchResultPosition=10"
                      className={styles.links}
                    >
                      Americans May Add Five Times More Plastic to the Oceans Than Thought
                    </a>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </Col>

            <Col className="mt-3">
              <Carousel>
                <Carousel.Item>
                  <Image 
                    src="https://static01.nyt.com/images/2020/11/08/fashion/07CDS-1/07CDS-1-jumbo.jpg?quality=90&auto=webp" 
                    alt="First Slide" 
                    className="w-100"
                  />

                  <Card.ImgOverlay className={styles.slideOverlay}/>

                  <Carousel.Caption>
                    <a
                      href="https://www.nytimes.com/2020/11/07/style/the-uneasy-afterlife-of-our-dazzling-trash.html?searchResultPosition=9"
                      className={styles.links}
                    >
                      The Uneasy Afterlife of Our Dazzling Trash
                    </a>
                  </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                  <Image 
                    src="https://static01.nyt.com/images/2020/11/20/multimedia/20sp-watchpackaging-inyt1/merlin_179941779_fad8d9de-0d2c-469b-9b64-c91eedbcb117-jumbo.jpg?quality=90&auto=webp" 
                    alt="Second Slide" 
                    className="w-100"
                  />

                  <Card.ImgOverlay className={styles.slideOverlay}/>

                  <Carousel.Caption>
                    <a
                      href="https://www.nytimes.com/2020/11/19/fashion/watches-packaging-breitling.html?searchResultPosition=30"
                      className={styles.links}
                    >
                      Reducing the Impact of the Packaging
                    </a>
                  </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                  <Image 
                    src="https://static01.nyt.com/images/2021/02/02/multimedia/26sp-currents-fashion/26sp-currents-fashion-superJumbo.gif?quality=90&auto=webp" 
                    alt="Third Slide" 
                    className="w-100"
                  />

                  <Card.ImgOverlay className={styles.slideOverlay}/>
                  
                  <Carousel.Caption>
                    <a
                      href="https://www.nytimes.com/2021/01/26/fashion/sustainability-clothes-environment-technology.html?searchResultPosition=4"
                      className={styles.links}
                    >
                      Fashion Trends Are Often Recycled. Now More Clothing Can Be, Too.
                    </a>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
        </Col>

        <Col md={12} lg={4} xl={3}>
          <Jumbotron className={`${styles.contentContainer} shadow`}>
            <h3 className="text-center">Ways To Contribute</h3>
              <Card className="mt-3">
                <Card.Header className="justify-content-center d-flex">
                  <Button 
                  variant="info" 
                  className={styles.buttonTrigger}
                >
                  Recycling Guidelines
                </Button>
                </Card.Header>

                  <Card.Img 
                    variant="top" 
                    src="https://pixfeeds.com/images/save-nature/1280-508877770-different-colored-recycle-waste-bins.jpg"
                  />

                  <Card.Body>
                    One of the key steps in the journey towards contributing is learning about reycling guidelines!
                    You can head over to the EPA's (Environment Protection Agency) website to learn the basics! You may
                    also want to search the web for guidelines specific to your community!
                  </Card.Body>
              </Card>

              <Accordion className="mt-3">
                <Card>
                  <Card.Header className="justify-content-center d-flex">
                    <ContextAwareToggle eventKey="0">How RecycleIT Can Help</ContextAwareToggle>
                  </Card.Header>

                  <Accordion.Collapse eventKey="0">
                    <>
                      <Card.Img src="https://images.unsplash.com/photo-1481761289552-381112059e05?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1161&q=80"/>
                      <Card.Body>
                        Simply put, recycling is the process of converting waste materials into new materials! 
                        Of course, there's more to it than just creating new from the old. 
                        The process is also beneficial towards the surrounding environment in many ways!
                      </Card.Body>
                    </>
                  </Accordion.Collapse>
                </Card>
            </Accordion>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
};


const Home = () => {
  return (
    <>
      <MetaData title="ReycleIT Home"/>
      <Navigation/>
      <HomeContent/>
      <Footer/>
    </>
  );
};

export default Home;
