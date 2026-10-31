import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { apiUrl, fileUrl } from '../common/http';
import Header from '../common/Header';
import Hero from '../common/Hero';
import ShowTestimonial from '../common/ShowTestimonial';
import Footer from '../common/Footer';

const ProjectDetail = () => {
  const params = useParams();
    const [project, setProject] = useState([]);
    const [projects, setProjects] = useState([]);

    const FetchProjects = async () => {
        const res = await fetch(`${apiUrl}get-projects`, {
            method: 'GET',
        });
        const result = await res.json();
        console.log(result);
        setProjects(result.data);
    }

    const FetchProject = async () => {
        const res = await fetch(`${apiUrl}get-project/${params.id}`, {
            method: 'GET',
        });
        const result = await res.json();
        console.log(result);
        setProject(result.data);
    }

    useEffect(() => {
        FetchProjects();
        FetchProject();
    }, [params.id]);

    useLayoutEffect(() => {
    window.scrollTo(0, 0);
    }, [params.id]);

  return (
    <>
    <Header/>

    <main>

        <Hero preHeading='Quality. Integrity. Value.'
            heading={`${project?.title}`}
            text=''
            />
        <section className='section-10'>
        <div className='container py-5'>
            <div className='row'>
                <div className='col-md-3'>
                    <div className='card shadow border-0 sidebar'>
                        <div className='card-body px-4 py-4'>
                            <h3 className='mt-2 mb-3'>Insight</h3>
                            <ul>
                                {
                                  project.location &&
                                  <li className='mb-2'>
                                    <span className='text-body-secondary'>Location</span>
                                  <p>{project.location}</p>
                                  </li>
                                }

                                {
                                  project.construction_type &&
                                  <li className='mb-2'>
                                    <span className='text-body-secondary'>Construction Type</span>
                                  <p>{project.construction_type}</p>
                                  </li>
                                }

                                {
                                  project.sector &&
                                  <li className='mb-2'>
                                    <span className='text-body-secondary'>Sector</span>
                                  <p>{project.sector}</p>
                                  </li>
                                }

                            </ul>
                        </div>
                    </div>
                </div>
                <div className='col-md-9'>
                    <div>
                        {project?.image && (
                            <img
                                className='img-fluid service-detail-image'
                                src={`${fileUrl}/uploads/projects/large/${project.image}`}
                                alt={project.title || 'Project'}
                            />
                        )}
                    </div>
                    <h3 className='py-3'>{project.title}</h3>
                    <div dangerouslySetInnerHTML={{__html:project.content}}></div>
                </div>
            </div>

        </div>
        </section>
        <section className='section-11 bg-light'>
          <ShowTestimonial/>
        </section>
    </main>

    <Footer/>

    </>
  )
}

export default ProjectDetail