import './Home.css';

function Home() {

    const productData = [
        {
            id: 1,
            name: "Untitled",
            price: 600,
            img_url: "https://cdn.dribbble.com/userupload/10564178/file/original-1344b65403b6787b07998a9fe93cc577.jpg?resize=512x384"
        },
        {
            id: 2,
            name: "Sanborn Avenue",
            price: 1100,
            img_url: "https://cdn.dribbble.com/users/648290/screenshots/6161272/media/385e000b8732228c7844a119de9ae3a6.jpg?resize=512x354"
        },
        {
            id: 3,
            name: "South Africa",
            price: 2250,
            img_url: "https://cdn.dribbble.com/users/59947/screenshots/3479596/dribbb.jpg?resize=512x284"
        },
        {
            id: 4,
            name: "Ash Cave",
            price: 600,
            img_url: "https://cdn.dribbble.com/userupload/3266648/file/original-b12e684944557e005eb351e3ba59e06e.jpg?resize=752x"
        },
        {
            id: 5,
            name: "Nebula",
            price: 300,
            img_url: "https://cdn.dribbble.com/users/69311/screenshots/4927396/crab-nebula.jpg?resize=800x600"
        }
    ];

    function getProductGrid() {
        return (<div className="product-grid">
            {productData.map((product, index) => (
                <a key={product.id} className="product" href={"/product-detail/" + product.id}>
                    <div>
                        <img src={product.img_url} alt=""/>
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
