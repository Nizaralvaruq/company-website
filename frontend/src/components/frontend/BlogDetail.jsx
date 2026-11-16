import React, { useEffect, useState } from 'react'
import Hero from '../common/Hero'
import Header from '../common/Header'
import Footer from '../common/Footer'
import { Link, useParams } from 'react-router-dom'
import { apiUrl, fileUrl } from '../common/http'

const BlogDetail = () => {

      const params = useParams();
    const [article, setArticle] = useState([]);
    const [latestArticles, setLatestArticles] = useState([]);

    const FetchLatestArticles = async () => {
        const res = await fetch(`${apiUrl}get-latest-articles`, {
            method: 'GET',
        });
        const result = await res.json();
        setLatestArticles(result.data);
    }

    const FetchArticle = async () => {
        const res = await fetch(`${apiUrl}get-article/${params.id}`, {
            method: 'GET',
        });
        const result = await res.json();
        console.log(result);
        setArticle(result.data);
    }

    useEffect(() => {
        FetchArticle();
        FetchLatestArticles();
    }, [params.id]);


  return (
    <>
    <Header/>
        <main>
            <Hero preHeading='Quality. Integrity. Value.'
                heading='Blog Detail'
                text='We excel at transforming visions into reality
                through outstanding craftsmanship and precise.'
            />
            <section className='section-11'>
            <div className='container py-5'>
                <div className='row'>
                    <div className='col-md-8'>
                        <h2>{article.title}</h2>
                        <div className="pb-3">by <strong>{article.author}</strong> on {article.created_at}</div>

                        <div className="pe-md-5 pb-3">
                            <img
                                className='img-fluid service-detail-image'
                                src={`${fileUrl}/uploads/articles/large/${article.image}`}
                                alt=''
                            />
                        </div>
                        <div dangerouslySetInnerHTML={{__html:article.content}}>

                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className='card shadow border-0 sidebar'>
                            <div className='card-body px-5 py-4'>
                                <h3 className='mt-2 mb-3'>Latest Blog</h3>
                                {
                                    latestArticles && latestArticles.map(article =>{
                                       return (
                                        <div key={`article-${article.id}`} className='d-flex border-bottom mb-3 pb-2'>
                                            <div className='pe-3 pb-2'>
                                            <img width={100}
                                                className='img-fluid service-detail-image'
                                                src={`${fileUrl}/uploads/articles/small/${article.image}`}
                                                alt=''
                                            />
                                            </div>
                                            <Link to={`/blog/${article.id}`}>{article.title}</Link>
                                            <hr />
                                        </div>
                                       )
                                    })
                                }

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

export default BlogDetail