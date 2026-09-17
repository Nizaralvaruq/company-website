import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import Hero from '../common/Hero'

const ContactUs = () => {
  return (
    <>
    <Header/>
    <main>
        <Hero preHeading='Quality. Integrity. Value.'
            heading='Blogs'
            text='We excel at transforming visions into reality
            through outstanding craftsmanship and precise.'
        />
        <section className='section-9 py-5'>
        <div className='container'>
            <div className='section-header text-center'>
            <span></span>
            <h2>Contact Us</h2>
            <p>Our dedicated experts are here to help you with any of your questions, contact us by<br/>
                filling out the form below and we will be in touch shortly.</p>
        </div>
        <div className='row mt-5'>
            <div className='col-md-3'>
            <div className='card shadow border-o mb-3'>
                <div className='card-body p-4'>
                    <h3>Call Us</h3>
                    <div><a href="#">(6878888)</a></div>
                    <div><a href="#">(232-132-562)</a></div>

                    <h3 className='mt-4'>You can write us</h3>
                    <div><a href="#">example@gmail.com</a></div>
                    <div><a href="#">info@mail.com</a></div>

                    <h3 className='mt-4'>Address</h3>
                    <div>B-18X, Rajaji Puram<br/>
                    Lucknow, Uttar Pradesh, 226017
                    0522400XXXX</div>
                </div>

            </div>
            </div>
            <div className='col-md-9'>
                <div className='card shadow border-o'>
                    <div className='card-body p-5'>
                    <form action="">
                        <div className='row'>
                            <div className='col-md-6 mb-4'>
                                <label htmlFor="" className='form-label'>Name</label>
                                <input type="text" className='form-control form-control-lg' placeholder='Enter Name'/>
                            </div>
                            <div className='col-md-6 mb-4'>
                                <label htmlFor="" className='form-label'>Email</label>
                                <input type="text" className='form-control form-control-lg' placeholder='Enter Email'/>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-md-6 mb-4'>
                                <label htmlFor="" className='form-label'>Phone</label>
                                <input type="text" className='form-control form-control-lg' placeholder='Subject'/>
                            </div>
                            <div className='col-md-6 mb-4'>
                                <label htmlFor="" className='form-label'>Phone</label>
                                <input type="text" className='form-control form-control-lg' placeholder='Subject'/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="" className='form-label'>Mesagge</label>
                            <textarea name="" placeholder='Mesagge' rows={5} id=""className='form-control form-control-lg'></textarea>
                        </div>

                        <button className='btn btn-primary mt-3'>Submit</button>
                    </form>
                    </div>
                </div>

            </div>
        </div>
        </div>
        
        
        </section>
    </main>
    <Footer/>
    </>
  )
}

export default ContactUs