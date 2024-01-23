import './Dashboard.css'
import React, {useEffect, useState} from "react";
import { SalesOverTimeData } from "../data/SalesOverTimeData";
import { ProductPerformanceData } from "../data/ProductPerformanceData";
import {Bar, Line} from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function Dashboard() {
    const [products, setProducts] = useState([]);

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const month = String(date.getMonth() + 1); // getMonth() returns 0-11
        const day = String(date.getDate());
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    };

    const [salesOverTimeData, setSalesOverTimeData] = useState({
        labels:  SalesOverTimeData.map((data) => formatDate(data.date)),
        datasets: [
            {
                label: "Overall Sales",
                data: SalesOverTimeData.map((data) => data.sales),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                ],
                borderColor: "black",
                borderWidth: 2,
            },
        ],
    });

    const [productPerformanceData, setProductPerformanceData] = useState({
        labels:  ProductPerformanceData.map((data) => data.name),
        datasets: [
            {
                label: "Product Sales To Date",
                data: ProductPerformanceData.map((data) => data.sales),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                ],
                borderColor: "black",
                borderWidth: 2,
            },
        ],
    });

    const productPerformanceOptions = {
        scales: {
            x: {
                ticks: {
                    callback: function(value, index, values) {
                        const label = ProductPerformanceData[index].name;
                        return label.split(' ');
                    }
                }
            }
        }
    };


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

    function handleDeleteClick(productId) {
        const isConfirmed = window.confirm("Are you sure you want to delete this product?");
        if (isConfirmed) {
            const token = localStorage.getItem('shop_access_token');

            fetch(`http://localhost:8080/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error deleting product: ${response.status} ${response.statusText}`);
                    }
                    return response;
                })
                .then(() => {
                    fetchAllProducts(); // Fetch all products again to update the list
                })
                .catch(error => {
                    console.error('Error occurred while deleting product:', error);
                });
        }
    }

    function getProductTable() {
        return (
            <table>
                <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product, index) => (
                    <tr key={product.id}>
                        <td>
                            { product.imageUrl && <img src={"http://localhost:8080/" + product.imageUrl} alt={product.name} style={{ width: '50px', height: 'auto' }}/> }
                        </td>
                        <td>
                            <a href={"/products/" + product.id}>{product.name}</a>
                        </td>
                        <td>
                            {product.price}
                        </td>
                        <td>
                            <a href={"/add-edit-product/" + product.id}>Edit</a>
                        </td>
                        <td>
                            <button onClick={() => handleDeleteClick(product.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        );
    }

    return (
        <div className="dashboard-container">
            <h1>Sales Dashboard</h1>
            <div className="charts-row">
                <div className="line-chart">
                    <Line data={salesOverTimeData} />
                </div>
                <div className="bar-chart">
                    <Bar data={productPerformanceData} options={productPerformanceOptions}/>
                </div>
            </div>
            <div className="table-container">
                <div className="table-title">
                    <h2>All Products</h2>
                    <a className="add-product-button" href={"/add-edit-product/"}>Add Product</a>
                </div>
                {getProductTable()}
            </div>
        </div>
    );
}

export default Dashboard;
