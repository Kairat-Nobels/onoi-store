import React, { useState, useMemo, useRef, useEffect } from 'react';
import ProductCard from '../../../../components/ProductCard/ProductCard';
import { FaFilter } from "react-icons/fa";
import { useSelector } from 'react-redux';
import "./shopProducts.scss";
import Spinner from '../../../../components/Spinner/Spinner';

const ShopProducts = () => {
    const { items, loading, error } = useSelector((state) => state.itemsReducer);
    const selectedCategory = useSelector((state) => state.filterReducer.selectedCategory);

    const { categories } = useSelector((state) => state.categoriesReducer);

    // Состояния фильтров
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 0]);
    const [search, setSearch] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [sortValue, setSortValue] = useState('');

    // Минимальная и максимальная цена для слайдера
    const minPrice = useMemo(() => Math.min(...items.map(i => i.price)), [items]);
    const maxPrice = useMemo(() => Math.max(...items.map(i => i.price)), [items]);

    // Устанавливаем дефолтный диапазон цен при загрузке товаров
    useEffect(() => {
        if (items.length) setPriceRange([minPrice, maxPrice]);
    }, [minPrice, maxPrice, items.length]);

    // Фильтрация товаров
    const filteredItems = items.filter(item => {
        if (search && !item.title.toLowerCase().includes(search.toLowerCase())) return false;
        if (selectedCategories.length && !selectedCategories.includes(item.category)) return false;
        if (item.price < priceRange[0] || item.price > priceRange[1]) return false;
        if (selectedCategory && selectedCategory !== "All" && item.category !== selectedCategory) return false;
        return true;
    });

    const sortedItems = useMemo(() => {
        let arr = [...filteredItems];
        if (sortValue === "Low") arr.sort((a, b) => a.price - b.price);
        if (sortValue === "High") arr.sort((a, b) => b.price - a.price);
        return arr;
    }, [filteredItems, sortValue]);


    const handleCategoryChange = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    // Для закрытия фильтра при клике вне блока
    const filterRef = useRef();
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setShowFilters(false);
            }
        };
        if (showFilters) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showFilters]);

    return (
        <div className="shop-products">
            <div className="filter-part d-flex justify-content-between py-5 align-items-center" style={{ gap: 16 }}>
                <div style={{ position: "relative" }}>
                    <button className="general-button" onClick={() => setShowFilters(f => !f)}>
                        <FaFilter /> <span className='ps-1'>Фильтры</span>
                    </button>
                    {showFilters && (
                        <div
                            ref={filterRef}
                            className="filters-dropdown shadow"
                            style={{
                                position: "absolute",
                                top: "110%",
                                left: 0,
                                zIndex: 10,
                                background: "#fff",
                                borderRadius: 8,
                                padding: "18px 20px",
                                minWidth: 220,
                                boxShadow: "0 4px 16px rgba(0,0,0,0.08)"
                            }}
                        >
                            <div className="mb-3 filters-body">
                                <label className="fw-bold mb-2 d-block">Категории:</label>
                                <div className="d-flex flex-column gap-1">
                                    {categories.map(category => (
                                        <label key={category.id} style={{ fontWeight: 400 }}>
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes(category.name)}
                                                onChange={() => handleCategoryChange(category.name)}
                                            />{" "}
                                            {category.name}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="fw-bold mb-2 d-block">Цена:</label>
                                <div style={{ width: 220, margin: "0 auto" }}>
                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                        <span>от {priceRange[0]} сом</span>
                                        <span className="text-muted">-</span>
                                        <span>до {priceRange[1]} сом</span>
                                    </div>
                                    <input
                                        type="range"
                                        min={minPrice}
                                        max={maxPrice}
                                        value={priceRange[0]}
                                        onChange={e => {
                                            const val = Number(e.target.value);
                                            setPriceRange([Math.min(val, priceRange[1]), priceRange[1]]);
                                        }}
                                        style={{ width: "100%" }}
                                    />
                                    <input
                                        type="range"
                                        min={minPrice}
                                        max={maxPrice}
                                        value={priceRange[1]}
                                        onChange={e => {
                                            const val = Number(e.target.value);
                                            setPriceRange([priceRange[0], Math.max(val, priceRange[0])]);
                                        }}
                                        style={{ width: "100%", marginTop: 4 }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div style={{ position: "relative", width: "100%", maxWidth: 500, minWidth: 300 }}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Поиск по названию..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{ width: "100%" }}
                    />
                    {search && (
                        <button
                            type="button"
                            onClick={() => setSearch('')}
                            style={{
                                position: "absolute",
                                right: 10,
                                top: "50%",
                                transform: "translateY(-50%)",
                                background: "none",
                                border: "none",
                                fontSize: 20,
                                color: "#888",
                                cursor: "pointer"
                            }}
                            aria-label="Очистить поиск"
                        >
                            ×
                        </button>
                    )}
                </div>
                <select
                    name="sort-list"
                    id="sort-list"
                    value={sortValue}
                    onChange={e => setSortValue(e.target.value)}
                    className="form-select"
                    style={{ maxWidth: 220 }}
                >
                    <option value="">Сортировка по умолчанию</option>
                    <option value="Low">Сначала дешевые</option>
                    <option value="High">Сначала дорогие</option>
                </select>
            </div>

            <div className="row">
                {
                    loading ? <div className='center'><Spinner /></div> :
                        error ? <div className='fetchError'><p>😕 Error: {error}</p><p>Проверьте Интернет и Обновите страницу</p></div> :
                            sortedItems.length === 0 ? (
                                <div className="text-center text-muted py-5">Товары не найдены</div>
                            ) : (
                                sortedItems.map((item) => (
                                    <ProductCard
                                        key={item.id}
                                        item={item}
                                        image={item.image}
                                        title={item.title}
                                        category={item.category}
                                        price={item.price}
                                        oldPrice={item.oldPrice}
                                    />
                                ))
                            )
                }
            </div>
        </div>
    )
}

export default ShopProducts;