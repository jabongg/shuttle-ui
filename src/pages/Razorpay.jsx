import React, { useState } from "react";
import axios from "axios";

const Razorpay = () => {
    const [amount, setAmount] = useState("");

    // Use environment variable for API base URL
    const API_BASE_URL = import.meta.env.VITE_API_URL;
    console.log("Razorpay - API Base URL: " , API_BASE_URL);


    const handlePayment = async () => {
        try {
            console.log("Creating order with amount:", amount);
            const response = await axios.post(`${API_BASE_URL}/razorpay/create-order?amount=${selectedCourtInfo.price}`
        );

            console.log("Order created successfully:", response.data);
            // You can now use the response data to proceed with Razorpay payment
        } catch (error) {
            console.error("Error creating order:", error);
        }
    };

    return (
        <div>
            <h1>Razorpay Payment</h1>
            <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handlePayment}>Pay Now</button>
        </div>
    );
};

export default Razorpay;