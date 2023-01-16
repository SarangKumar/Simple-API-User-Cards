import React, { useEffect, useState } from 'react';
import axios from "axios";
import {
  ChakraProvider,
  Box,
  theme,
  Avatar,
  Container,
  HStack,
  Text,
  IconButton,
  Spinner,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { EmailIcon } from '@chakra-ui/icons';
import './App.css'


function App() {

  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const options = { method: 'GET', url: 'http://localhost:5000/sarang' };

        axios.request(options).then(function (response) {
          setUserData(response.data.results);
          setLoading(false)
        }).catch(function (error) {
          setLoading(false)
          console.error(error);
        });
      }
      catch (err) {
        setLoading(false)
        console.log(err.message);
      }
    };
    fetchUserData();
  }, [])


  return (
    <ChakraProvider theme={theme} className='main'>
      <ColorModeSwitcher pos='fixed' variant='solid' colorScheme='teal' top={'4'} right={'4'} />
      {loading
        ? <HStack h={'100vh'} pos="absolute" top={"50%"} left={'50%'} transform={"translate(-50%)"}><Spinner margin={'auto'} align={'center'} height={'100px'} width={'100px'} thickness="4px" speed="0.65s" emptyColor="gray.200" color="teal.500" /></HStack>
        : <div className='container'>
          {userData.map((uData, index) => {
            return (<User key={index} data={uData} />)
          })}
        </div>
      }
    </ChakraProvider>
  );
}

const User = ({ data }) => {
  console.log(data);
  const name = `${data.name.first} ${data.name.last}`,
    imgSrc = data.picture.large,
    phoneNo = data.phone,
    cellNo = data.cell,
    mail = data.email,
    address = `${data.location.street.number} ${data.location.street.name} ${data.location.city} ${data.location.state} ${data.location.country} ${data.location.postcode}`;

  return (
    <Container bgColor={'white'} border={'2px solid teal'} w={'400px'} h={'350px'} boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'} borderRadius={'10'} p={'30px'} >
      <HStack justifyContent={'space-between'} alignItems={'center'} >
        <Avatar boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'} border={'3px solid #fff'} size='2xl' name={name} src={imgSrc} alignSelf={'center'} h={'20'} w={'20'} />
        <Text textAlign={'center'} color={'teal'} noOfLines={'1'} fontWeight={'600'} fontSize={'35'} display={'inline'} fontFamily={'Poppins'} >
          {name}
        </Text>
      </HStack>
      <Box color={'teal'} fontWeight={'200'} fontSize={'14px'} fontFamily={'Poppins'} py={'5'}>
        <Text>
          {address}
        </Text>
        <Text fontSize={'10'}>
          {phoneNo}
        </Text>
        <Text fontSize={'10'}>
          {cellNo}
        </Text>
        <Text fontSize={'10'}>
          {mail}
        </Text>
        <IconButton bottom={'-5'} variant='outline' colorScheme='teal' aria-label='Send email' icon={<EmailIcon />} />
      </Box>
    </Container>
  )
}


export default App;
