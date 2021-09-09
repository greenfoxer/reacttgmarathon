import './App.css';
import React from 'react';
import Header from './components/Header';
import Layout from './components/Layout';
import Footer from './components/Footer';
import BgImage from './Assets/bg3.jpg';

const App = () =>{
  return (
    <React.Fragment>
      <Header title="My Awesome Title" descr="My Awesome Description"/>
      <Layout title="My Layout Title 1" descr="My Layout Description 1" urlBg={BgImage}/>
      <Layout title="My Layout Title 2" descr="My Layout Description 2" colorBg="SkyBlue"/>
      <Layout title="My Layout Title 3" descr="My Layout Description 3" urlBg={BgImage}/>
      <Footer />
    </React.Fragment>
  );
}

export default App;
