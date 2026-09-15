import React from 'react'

const Footer = () => {
  return (
    <footer>
    <div className='container py-5'>
      <div className='row'>
        <div className='col-md-3'>
          <h3>UrbanEdge Constructions</h3>
          <div className='pe-5'>
            <p>Our post-construction services gives you peace of mind knowing that we are still here for you even after.</p>
          </div>
        </div>

        <div className='col-md-3'>
          <h3 className='mb-3'>Our Services</h3>
          <ul>
            <li>
              <a href=''>Specialty Construction</a>
            </li>
            <li>
              <a href=''>Specialty Construction</a>
            </li>
            <li>
              <a href=''>Specialty Construction</a>
            </li>
            <li>
              <a href=''>Specialty Construction</a>
            </li>
          </ul>
        </div>

        <div className='col-md-3'>
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href=''>About Us</a>
            </li>
            <li>
              <a href=''>Services</a>
            </li>
            <li>
              <a href=''>Projects</a>
            </li>
            <li>
              <a href=''>Blog</a>
            </li>
            <li>
              <a href=''>Contact Us</a>
            </li>
          </ul>
        </div>

        <div className='col-md-3'>
          <h3>Contact Us</h3>
          <ul>
            <li>
              <a href=''>(888-000-0000)</a>
            </li>
            <li>
              <a href=''>Nizar@gmail.com</a>
            </li>
            <p>Kediri Jawa Timur Indonesia</p>
          </ul>
        </div>
        <hr />
        <div className='text-center pt-4'>Copyright © 2026 UrbanEdge Construtions. All Rights Reserved.</div>
      </div>
    </div>
    </footer>
  )
}

export default Footer