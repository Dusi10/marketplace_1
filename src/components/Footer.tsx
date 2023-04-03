import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@mui/icons-material";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;

//Styled Footer logic
const Footer = () => {
  return (
    <Container className="bg-white mt-3">
      <Left style={{ marginLeft: "5.5%" }}>
        <Logo>Marketplace</Logo>
        <Desc>
          There are many clothes to find the best fitting you, or just find some
          items which are usefull for you.
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>
            <Nav.Link to="/clothes" as={NavLink}>
              Clothes
            </Nav.Link>
          </ListItem>
          <ListItem>
            <Nav.Link to="/Rent" as={NavLink}>
              Rent
            </Nav.Link>
          </ListItem>
          <ListItem>
            <Nav.Link to="/Everyday" as={NavLink}>
              Everyday
            </Nav.Link>
          </ListItem>
          <ListItem>
            <Nav.Link to="/Help" as={NavLink}>
              Help
            </Nav.Link>
          </ListItem>
          <ListItem>
            <Nav.Link to="/Books" as={NavLink}>
              Books
            </Nav.Link>
          </ListItem>
          <ListItem>
            <Nav.Link to="/Home" as={NavLink}>
              Home
            </Nav.Link>
          </ListItem>
          <ListItem>
            <Nav.Link to="/Food" as={NavLink}>
              Food
            </Nav.Link>
          </ListItem>
          <ListItem>
            <Nav.Link to="/Sellitem" as={NavLink}>
              Sell
            </Nav.Link>
          </ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} /> 9764 Csempeszkopács, István
          király utca 18
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> +36307855664
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} />
          vegh.adam2000@gmail.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
