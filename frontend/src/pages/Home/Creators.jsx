import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';
import './Creators.css';
import {Container} from "react-bootstrap";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

export default function Creators() {
  return (
    <>
      <NavBar />
      <Container className="picture">
      <MDBCarousel showControls showIndicators>
        <MDBCarouselItem
          className='w-100 d-block'
          itemId={1}
          src='https://mdbootstrap.com/img/new/slides/041.jpg'
          alt='...'>
          <h4>The Developers</h4>
          <p>MERN STACK</p>
        </MDBCarouselItem>

        <MDBCarouselItem
          className='w-100 d-block'
          itemId={2}
          src='https://mdbootstrap.com/img/new/slides/040.jpg'
          alt='...'>
          <h4>Aryan Michaek</h4>
          <p>Frontend Development</p>
        </MDBCarouselItem>

        <MDBCarouselItem
          className='w-100 d-block'
          itemId={3}
          src='https://mdbootstrap.com/img/new/slides/045.jpg'
          alt='...'>
          <h4>Dharmik Patel</h4>
          <p>Backend Development</p>
        </MDBCarouselItem>
      </MDBCarousel>
      </Container>
      <Footer />
    </>
  );
}
