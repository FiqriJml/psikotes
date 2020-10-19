import React from 'react'
import Content from './Content'
import Footer from './Footer'
import Header from './Header'
import Menu from './Menu'

export default function Template({title, content, history, active_link}) {
    return (
        <>
           <Header/>
           <Content
                title={title}
                content={content}
                history={history}
           />
           <Menu active_link={active_link}/>
           <Footer/>
        </>
    )
}
