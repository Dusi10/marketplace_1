import { Carousel, Container } from 'react-bootstrap';
import { AllListings } from './AllListings'; // replace with your own component for displaying an item

const items = [ // replace with your own array of items to display
  { id: 1, typeOfItem: 'Clothes'},
  { id: 2, typeOfItem: 'Item' },
  { id: 3, typeOfItem: 'Food' },
  { id: 4, typeOfItem: 'Book' },
];

function ItemCarousel() {
    const maxItemsToShow = 4
    const title = "Nézz körbe friss hirdetéseink között"
  return (
    <Container>
      <Carousel >
          {items.slice(0, 4).map((item) => (
              <Carousel.Item key={item.id}>
                  <AllListings typeOfItem={item.typeOfItem} maxItemToShow={4} title={title}/>
              </Carousel.Item>
          ))}
      </Carousel>
    </Container>
  );
}

export default ItemCarousel;
