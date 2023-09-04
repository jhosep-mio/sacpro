// import React from 'react'
import { useEffect, useState } from 'react'

import {
    type blogsValues,
  } from '../shared/Interfaces'
  import { getData } from '../shared/FechData'
  import { Global } from '../../helper/Global'
  import Loading from '../shared/Loading'

const Blog = () => {
    const [blogs, setBlog] = useState([])
    const [ loadingComponents, setLoadingComponents ] = useState(false)
    useEffect(() => {
        setLoadingComponents(true)
        Promise.all([
          getData('getBlogs', setBlog),
        ]).then(() => {
          setLoadingComponents(false)
          window.scrollTo(0, 0)
        })
      }, [])
  return (
    <>
      {loadingComponents && <Loading />}
        <section className="banner bannerBlog">
            <div className="banner__content">
                <h1>BLOGS</h1>
            </div>
        </section>
        <div className="blog">
            <div className="blog__main">
                {blogs.map((blog:blogsValues)=> (
                    <div className="blog__main__item">
                        <div className="blog__main__item__img">
                            <img src={`${Global.urlImages}/blog/${blog.imagen1}`} alt={`${blog.titulo} - Dioselyna`} />
                        </div>
                        <div className="blog__main__item__info">
                            <p><span>Dioselyna - </span> 5 de Julio 2023</p>
                            <h1>{blog.titulo}</h1>
                            <p>{blog.resumen}</p>

                        </div>
                    </div>
                ))}
               
            </div>
        </div>
    </>
  )
}

export default Blog