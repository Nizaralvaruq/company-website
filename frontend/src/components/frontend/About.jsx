import React from 'react'
import Header from '../common/Header';
import Footer from '../common/Footer';
import {default as AboutNew} from '../common/about'

import Hero from '../common/Hero';
import ShowTestimonial from '../common/ShowTestimonial'
import Team from '../common/Team';
const About = () => {
  return (
    <>
    <Header/>
    <main>
      <Hero preHeading='Quality. Integrity. Value.'
      heading='About Us'
      text='We excel at transforming visions into reality
                  through outstanding craftsmanship and precise.'
      />
      <AboutNew/>
    
    {/* Our team*/}

    <Team/>

    <ShowTestimonial/>

    </main>
    <Footer/>
    </>
  )
}

export default About