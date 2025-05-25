import React from 'react'
import HomeCollectionItem from '../HomeCollectionItem/HomeCollectionItem'

const HomeCollection = () => {
    return (
        <div className="home-collection">
            <div className="page-container">
                <HomeCollectionItem
                    image='https://www.ipavlik.ru/uploadedFiles/images/news/2024/2/iphone-16-pro-6.jpg'
                    title='Новейшие смартфоны'
                    comment='Популярные модели 2024 года — для работы, учебы и развлечений'
                    reverse={false}
                />
                <HomeCollectionItem
                    image='https://cinemadslrshop.ru/wa-data/public/shop/products/98/03/398/images/1621/1621.970.jpg'
                    title='Ноутбуки для любых задач'
                    comment='Мощные и стильные ноутбуки для дома, офиса и творчества'
                    reverse={true}
                />
            </div>
        </div>
    )
}

export default HomeCollection