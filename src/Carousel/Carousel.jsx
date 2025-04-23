import Carousel from 'react-bootstrap/Carousel';
import "./carouselstyle.css";



const Slider = () => {
    return (
        <section className=" mainslider" style={{marginBottom:"10px"}}>
            <div className="slider">
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://cdn.gadgets360.com/content/assets/upcoming-holywood-movies-banner-1200x400.jpg"
                            alt="First slide"
                            height={250}
                            
                        />
                        {/* <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption> */}
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://static.tnn.in/thumb/msid-106283911,thumbsize-88384,width-1280,height-720,resizemode-75/106283911.jpg"
                            alt="Second slide"
                            height={250}
                        />

                       
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/355/1090355-h-56b074f41874"
                            alt="Third slide"
                            height={250}
                        />

                
                    </Carousel.Item>
                </Carousel>


            </div>
        </section>



    )
}

export default Slider