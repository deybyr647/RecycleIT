import { useContext } from "react";

import { Container, Row, Col, Jumbotron, Image, Carousel, Accordion, Card, Button, AccordionContext, useAccordionToggle } from "react-bootstrap";
import { BiRecycle } from "react-icons/bi";
import styles from "../styles/index.module.css";
import etcStyles from "../styles/etc.module.css";

import MetaData from "../components/metadata";
import Navigation from "../components/navbar";
import Footer from "../components/footer";

interface ContextAwareToggleProps {
  children: React.ReactNode,
  eventKey: string,
  onToggle?: Function
};

const ContextAwareToggle = ({children, eventKey, onToggle}: ContextAwareToggleProps) => {
  const currentEventKey = useContext(AccordionContext);
  const decoratedOnClick = useAccordionToggle(eventKey, () => onToggle && onToggle(eventKey));
  const isCurrentEventKey: boolean = currentEventKey === eventKey;

  return(
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
  return(
    <Container>
      <Row className="mb-4">
        <Col>
          <Card className="shadow border-0">
            <Image
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2074&q=80" 
              className="w-100"
              alt="Recycling Bin"
              rounded
            />

            <Card.ImgOverlay className={`d-flex align-items-end ${styles.homeOverlay}`}>
              <Card.Body className="text-white">
                  <Card.Title>RecycleIT</Card.Title>
                  <Card.Text>A new, simple way to recycling</Card.Text>
              </Card.Body>
              <BiRecycle size={36} className={etcStyles.faRecycle} style={{color: "white"}}/>
            </Card.ImgOverlay>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Carousel className="shadow">
            <Carousel.Item>
              <Image src="https://images.unsplash.com/photo-1604187351574-c75ca79f5807?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" className="d-block w-100"/>
            </Carousel.Item>

            <Carousel.Item>
              <Image src="https://images.unsplash.com/photo-1513615040015-9ab281b0f9e7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80" className="d-block w-100"/>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col xs={12} sm={6} md={12} lg={6}>
          <Jumbotron className={`${styles.contentContainer} shadow`}>
            <h3 className="text-center">The Ins &amp; Outs of Recycling</h3>
            <Accordion className="mt-3">
              <Card>
                <Card.Header className="justify-content-center d-flex">
                  <ContextAwareToggle eventKey="0">What Is Recycling?</ContextAwareToggle>
                </Card.Header>

                <Accordion.Collapse eventKey="0">
                  <>
                    <Card.Img src="https://images.unsplash.com/photo-1481761289552-381112059e05?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1161&q=80"/>
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
          <Jumbotron className={`${styles.contentContainer} shadow`}>
            <h3 className="text-center">Ways To Contribute</h3>
            <Accordion className="mt-3">
              <Card>
                <Card.Header className="justify-content-center d-flex">
                  <ContextAwareToggle eventKey="0">Recycling Guidelines</ContextAwareToggle>
                </Card.Header>

                <Accordion.Collapse eventKey="0">
                  <>
                    <Card.Img src="https://pixfeeds.com/images/save-nature/1280-508877770-different-colored-recycle-waste-bins.jpg"/>
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
  );
};


const Home = () => {
  return(
    <>
      <MetaData title="ReycleIT Home"/>
      <Navigation/>
      <HomeContent/>
      <Footer/>
    </>
  );
};

export default Home;
