import './Home.css';
import {useEffect, useState} from "react";

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchAllProducts();
    }, []);

    const fetchAllProducts = () => {
        const token = localStorage.getItem('shop_access_token');

        fetch(`http://localhost:8080/products/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
                }
            })
            .then(data => {
                setProducts(data);
            })
            .catch(error => {
                console.error('Error occurred while fetching products:', error);
            });
    };

    function getProductGrid(begin, end) {
        return (<div className="product-grid">
            {products.slice(begin, end).map((product, index) => (
                <a key={product.id} className="product" href={"/products/" + product.id}>
                    <div>
                        <img src={"http://localhost:8080/" + product.imageUrl} alt=""/>
                        <p>{product.name}</p>
                    </div>
                </a>
            ))}
            <div className="view-all">
                <a href={"/products?special=for-you"}>View All</a>
            </div>
        </div>);
    }

    return (
        <div className="home-container">
            <div className="hero-section">
                <div className="left">
                </div>
                <div className="right">
                    <h1>Next Event</h1>
                    <h3>London 2024</h3>
                    <a href="/products?show=onefivefour">View Work</a>
                </div>
            </div>
            <div className="section">
                <h2>For You</h2>
                { getProductGrid(5,10) }
            </div>
            <div className="section">
                <h2>Featured</h2>
                { getProductGrid(10,15) }
            </div>
            <div className="section">
                <h2>Emerging</h2>
                { getProductGrid(0,5) }
            </div>
        </div>
    );
}

export default Home;
