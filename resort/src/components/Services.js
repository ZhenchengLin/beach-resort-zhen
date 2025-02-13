import React, { Component } from 'react'
import Title from './Title'
import { FaBeer, FaCocktail, FaHiking, FaShuttleVan } from 'react-icons/fa'
export default class Services extends Component {
    state = {
        services: [
            {
                icon: <FaCocktail />,
                title: "Free cocktails",
                info: "kapsd pqwmda wdpoksd qwdok askdpoqw"
            }
            ,
            {
                icon: <FaHiking />,
                title: "Endless Hiking",
                info: "kapsd pqwmda wdpoksd qwdok askdpoqw"
            }
            ,
            {
                icon: <FaShuttleVan />,
                title: "Free Shuttle",
                info: "kapsd pqwmda wdpoksd qwdok askdpoqw"
            }
            ,
            {
                icon: <FaBeer />,
                title: "Strongest Beer",
                info: "kapsd pqwmda wdpoksd qwdok askdpoqw"
            }
        ]
    }
    render() {
        return (
            <section className='services'>
                <Title title="Services"></Title>
                <div className='services-center'>
                    {this.state.services.map((item, index) => {
                        return <article key={index} className='service'>
                            <span>
                                {item.icon}
                            </span>
                            <h6>{item.title}</h6>
                            <p>{item.info}</p>
                        </article>
                    })}
                </div>
            </section>
        )
    }
}
