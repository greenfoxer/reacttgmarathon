import './App.css';
import React from 'react';
import Header from './components/Header';
import Layout from './components/Layout';
import Footer from './components/Footer';
import BgImage from './Assets/bg3.jpg';

const App = () =>{
  const headerTitle = "My Awesome Title";
  const headerDescr = "My Awesome Description";
  const firstLayoutTitle = "My Layout Title 1";
  const firstLayoutDescr = "My Layout Description 1";
  const secondLayoutTitle = "My Layout Title 2";
  const secondLayoutDescr = "My Layout Description 2";
  const thirdLayoutTitle = "My Layout Title 3";
  const thirdLayoutDescr = "My Layout Description 3";
  console.log(BgImage);
  return (
    <React.Fragment>
      <Header title={headerTitle} descr={headerDescr}/>
      <Layout title={firstLayoutTitle} descr={firstLayoutDescr} urlBg={BgImage}/>
      <Layout title={secondLayoutTitle} descr={secondLayoutDescr} colorBg="SkyBlue"/>
      <Layout title={thirdLayoutTitle} descr={thirdLayoutDescr} urlBg={BgImage}/>
      <Footer />
    </React.Fragment>
  );
}

export default App;
