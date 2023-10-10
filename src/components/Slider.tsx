import { Carousel, Container } from 'react-bootstrap';
import { AllListings } from './AllListings'; // replace with your own component for displaying an item

const items = [ // replace with your own array of items to display
  { id: 1, typeOfItem: 'Clothes'},
  { id: 2, typeOfItem: 'Item' },
];

function ItemCarousel() {
    const maxItemsToShow = 4
  return (
    <Container>
        <div>
            <h3>Nézz körbe friss hirdetéseink között</h3>
        </div>
      <Carousel >
          {items.slice(0, 4).map((item) => (
              <Carousel.Item key={item.id}>
                  <AllListings typeOfItem={item.typeOfItem}  maxItemToShow={4}/>
              </Carousel.Item>
          ))}
      </Carousel>
    </Container>
  );
}

export default ItemCarousel;
