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

    function getProductGrid() {
        return (<div className="product-grid">
            {products.map((product, index) => (
                <a key={product.id} className="product" href={"/product-detail/" + product.id}>
                    <div>
                        <img src={product.image_url} alt=""/>
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
            <h1>Welcome</h1>
            <div className="section">
                <h2>For You</h2>
                { getProductGrid() }
            </div>
            <div className="section">
                <h2>Featured</h2>
                { getProductGrid() }
            </div>
            <div className="section">
                <h2>Recently Added</h2>
                { getProductGrid() }
            </div>
        </div>
    );
}

export default Home;
