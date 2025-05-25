import React from 'react';
import "./hero.scss";
import { useNavigate } from 'react-router-dom';
const Hero = () => {
    const navigate = useNavigate()
    return (
        <div data-aos="zoom-in" className="hero page-container mb-4">
            <div className="hero-content">
                <h1 data-aos="fade-up">
                    Смартфоны<br /> и гаджеты<br /> для жизни и работы
                </h1>
                <p className="hero-subtitle" data-aos="fade-up">
                    Откройте для себя новинки смартфонов, ноутбуков и аксессуаров в ONOI Store. Технологии, которые делают жизнь проще!
                </p>
                <button data-aos="fade-up" onClick={() => navigate("/shop")} className='general-button mt-4'>
                    Перейти в каталог
                </button>
            </div>
        </div>
    )
}

export default Hero;