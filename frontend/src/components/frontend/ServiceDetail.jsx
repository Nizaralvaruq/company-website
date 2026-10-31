import React, { useEffect, useLayoutEffect, useState } from 'react'
import Header from '../common/Header';
import Footer from '../common/Footer';
import Hero from '../common/Hero';
import { Link, useParams } from 'react-router-dom';
import { apiUrl, fileUrl } from '../common/http'
import ShowTestimonial from '../common/ShowTestimonial';

const ServiceDetail = () => {
    const params = useParams();
    const [service, setService] = useState([]);
    const [services, setServices] = useState([]);

    const FetchServices = async () => {
        const res = await fetch(`${apiUrl}get-services`, {
            method: 'GET',
        });
        const result = await res.json();
        console.log(result);
        setServices(result.data);
    }

    const FetchService = async () => {
        const res = await fetch(`${apiUrl}get-service/${params.id}`, {
            method: 'GET',
        });
        const result = await res.json();
        console.log(result);
        setService(result.data);
    }

    useEffect(() => {
        FetchServices();
        FetchService();
    }, [params.id]);

    useLayoutEffect(() => {
    window.scrollTo(0, 0);
    }, [params.id]);

  return (
    <>
    <Header/>

    <main>

        <Hero preHeading='Quality. Integrity. Value.'
            heading={`${service?.title}`}
            text=''
            />
        <section className='section-10'>
        <div className='container py-5'>
            <div className='row'>
                <div className='col-md-3'>
                    <div className='card shadow border-0 sidebar'>
                        <div className='card-body px-4 py-4'>
                            <h3 className='mt-2 mb-3'>Our Service</h3>
                            <ul>
                                {
                                    services && services.map(service => {
                                        return (
                                            <li key={`service-${service.id}`}>
                                                <Link to={`/service/${service.id}`}>{service.title}</Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='col-md-9'>
                    <div>
                        {service?.image && (
                            <img
                                className='img-fluid service-detail-image'
                                src={`${fileUrl}/uploads/services/large/${service.image}`}
                                alt={service.title || 'Service'}
                            />
                        )}
                    </div>
                    <h3 className='py-3'>{service.title}</h3>
                    <div dangerouslySetInnerHTML={{__html:service.content}}></div>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-12'>
                    <ShowTestimonial/>
                </div>

            </div>
        </div>
        </section>
    </main>

    <Footer/>

    </>
  )
}

export default ServiceDetail