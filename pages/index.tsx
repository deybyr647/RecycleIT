import Head from 'next/head';
//import Link from 'next/link';

import {Container} from 'react-bootstrap';

import Navigation from '../components/nav';

const App = () => {
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

      <Container>
        <h1>Hello World</h1>
      </Container>
    </>
  )
}

export default App;
