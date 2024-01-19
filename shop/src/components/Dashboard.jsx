import './Dashboard.css'
import React, { useState } from "react";
import { SalesOverTimeData } from "../data/SalesOverTimeData";
import { ProductPerformanceData } from "../data/ProductPerformanceData";
import {Bar, Line} from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function Dashboard() {
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
                {productData.map((product, index) => (
                    <tr key={product.id}>
                        <td>
                            <img src={product.img_url} alt={product.name} style={{ width: '50px', height: 'auto' }}/>
                        </td>
                        <td>
                            <a href={"/product-detail/" + product.id}>{product.name}</a>
                        </td>
                        <td>
                            {product.price}
                        </td>
                        <td>
                            <button>Edit</button>
                        </td>
                        <td>
                            <button>Delete</button>
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
                    <button className="add-product-button">Add Product</button>
                </div>
                {getProductTable()}
            </div>
        </div>
    );
}

export default Dashboard;
