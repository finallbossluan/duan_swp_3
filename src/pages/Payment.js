import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import {useNavigate } from "react-router-dom";

const Payment = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const [showCoupon, setShowCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const styles = {
    pagetitle: {
      body: {
        backgroundColor: "#FAFBFC !important",
      },
      fontSize: "36px", // camelCase cho font-size
      fontWeight: "bold", // camelCase cho font-weight
      marginLeft: "100px",
      marginTop: "100px", // camelCase cho margin-bottom
      color: "#1d1f23", // Giá trị màu đặt trong dấu ngoặc kép
      textAlign: "left", // camelCase cho text-align
    },
    container: {
      display: "flex",
      justifyContent: "space-between",
      padding: "20px",
    },
    form: {
      width: "100%",
    },
    input: {
      width: "100%",
      margin: "10px 0",
      padding: "10px",
      backgroundColor: "#FAFBFC",
      border: "1px solid",
      borderColor: "#D6D8DE",
    },
    nameFields: {
      display: "flex",
      justifyContent: "space-between",
    },
    nameInput: {
      width: "48%",
      margin: "10px 0",
      padding: "10px",
      backgroundColor: "#FAFBFC",
      border: "1px solid",
      borderColor: "#D6D8DE",
    },
    paymentOption: {
      margin: "10px 0",
    },
    orderSummary: {
      width: "30%",
      backgroundColor: "#f9f9f9",
      padding: "20px",
      border: "1px solid #ddd",
    },
    sectionTitle: {
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    checkout: {
      width: "300px",
      height: "60px",
      textAlign: "center",
      fontWeight: "bold",
    },
    return: {
      display: "inlineBlock",
      with: "30%",
    },
    placeorder: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "100px",
    },
  };
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    postalCode: "",
    city: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();
    if (responseData.success) {
      setData(responseData.data);
    }
  };

  const handleLoading = async () => {
    await fetchData();
  };

  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, []);

  const totalPrice = data.reduce(
    (preve, curr) => preve + curr.quantity * curr?.productId?.sellingPrice,
    0
  );

  const createOrder = async () => {
    console.log("--context:");
    console.log(context);
    const userDetails = await context.fetchUserDetails();
    const orderCode = Number(String(Date.now()).slice(-6)); // Generate a unique order code
    console.log(data);
    const orderData = {
      userId: userDetails._id,
      orderCode: orderCode,
      products: data.map((item) => ({
        product_id: item.productId._id,
        productName: item.productId.productName,
        quantity: item.quantity,
        price_per_item: item.productId.sellingPrice,
      })),
      shipping_address: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        phone: formData.phone,
      },
      status: "pending",
      totalPrice: isCouponApplied ? totalPrice * 0.9 : totalPrice,
    };
  
    try {
      console.log("Sending order data: ", orderData); // Log order data
  
      const response = await fetch(SummaryApi.createOrder.url, {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
  
      const responseData = await response.json();
      console.log("Response data: ", responseData); // Log full response
  
      if (responseData.success) {
        payment(responseData.order._id, totalPrice, orderData.products, orderCode);
      } else {
        console.error("Order creation failed. Server response:", responseData);
        alert("Failed to create order. Please check the entered information.");
      }
    } catch (error) {
      console.error("Error creating order:", error); // Log full error message
      alert("An error occurred while creating the order. Please try again.");
    }
  };

  // Payment function
const payment = async (_id, totalPrice, products, orderCode) => {
  // Prepare the data for the payment link
  const items = products.map((product) => ({
    name: String(product.productName), // Replace with actual product name if available
    quantity: product.quantity,
    price: product.price_per_item,
  }));

  const body = {
    orderCode: orderCode,
    amount: totalPrice, // Total price calculated in createOrder
    description: "Thanh toan don hang", // Payment description
    items: items,
    returnUrl: `http://localhost:3000`, // Redirect URL after successful payment
    cancelUrl: `http://localhost:3000/cancel.html`, // Redirect URL after canceled payment
  };

  try {
    console.log("Initiating payment with the following details:");
    console.log("Total Price:", totalPrice);
    console.log("Items:", items);

    // Call the backend to create a payment link
    const response = await fetch(SummaryApi.payment.url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    console.log("payment response: ");
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      // Redirect the user to the payment link
      updateOrder(_id);
      deleteAllCartProducts(products);
      window.location.href = data.url;
    } else {
      console.error("Error creating payment link:", response.statusText);
      alert("Failed to initiate payment. Please try again.");
    }
  } catch (error) {
    console.error("Payment error:", error);
    alert("An error occurred while initiating payment. Please try again.");
  }
};

const deleteCartProduct = async (id) => {
  console.log('deleteCartProduct '+id);
  const response = await fetch(SummaryApi.deleteCartProduct.url, {
    method: SummaryApi.deleteCartProduct.method,
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      _id: id,
    }),
  });

  const responseData = await response.json();

  if (responseData.success) {
    fetchData();
    context.fetchUserAddToCart();
  }
};

const deleteAllCartProducts = async (products) => {
  console.log('deleteAllCartProducts');
  console.log(products);
  for (const product of products) {
      console.log(product);
      await deleteCartProduct(product.product_id); // Assuming product_id is the ID used for deletion
  }
};


const updateOrder = async (_id) => {
  const body = {
    _id: _id,
    status: "Payment successful"
  };
  try {
    const response = await fetch(SummaryApi.updateOrder.url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const dataResponse = await response.json();

    if (response.ok && dataResponse.success) {
      console.log('Order status updated successfully:', dataResponse);
      // You can perform further actions here, like redirecting the user or showing a success message
    } else {
      console.error('Failed to update order status:', dataResponse.message);
    }
  } catch (error) {
    console.error('Error updating order status:', error);
  }
};

  useEffect(() => {
    console.log('Context value:', context); // Log the context to check its contents
  }, [context]);
  
  

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log("Submit button clicked"); // Debugging log
    createOrder(); // Call createOrder function
  };

  const handleCouponApply = async () => {
    if (couponCode === "DISCOUNT10") {
      setIsCouponApplied(true);
    } else {
      alert("Invalid coupon code");
    }
  };

  return (
    <form className="container-fluid mx-auto" onSubmit={handleSubmit}>
      <h1 style={styles.pagetitle} title="Giỏ hàng" itemprop="headline">
        Giỏ hàng
      </h1>
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && <p className="bg-white py-5">No Data</p>}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        <div className="w-full max-w-3xl">
          <h3 style={styles.sectionTitle}>Contact information</h3>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />

          <h3 style={styles.sectionTitle}>Shipping Address</h3>
          <div style={styles.nameFields}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              style={styles.nameInput}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              style={styles.nameInput}
            />
          </div>

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="postalCode"
            placeholder="Zip code"
            value={formData.postalCode}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            style={styles.input}
          />

          <h3 style={styles.sectionTitle}>Payment Method</h3>
          <div style={styles.paymentOption}>
            <input type="radio" id="payOS" name="paymentMethod" value="payOS" />
            <label htmlFor="payOS" style={{ marginLeft: "7px",  fontSize: "18px" }}>

               Payment by bank transfer (Scan VietQR code) via <b style={{ marginLeft: "5px", fontWeight: "bold", color: "purple", fontSize: "25px"}}>payOS</b>
            </label>
          </div>

          <h3 style={{ marginTop: "10px",  fontSize: "15px" }}>
          By proceeding with your purchase, you agree to <a style = {{color : "blue"}} href = "#">Terms </a> and <a  style = {{color : "blue"}}  href = "#">Conditions</a> and <a  style = {{color : "blue"}}  href="#">Privacy Policy</a> of us          </h3>

          <div style={styles.placeorder}>
            <a href="/payment" style={{ margin: "auto", marginLeft: "0px" }}>
              <svg
                style={{ display: "inline", marginRight: "10px" }}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                />
              </svg>
              Return to Cart
            </a>

            <button
              type="submit"
              style={styles.checkout}
              className="bg-blue-600 p-2 text-white w-full rounded-b-lg"
            >
              Place Order
            </button>
          </div>
        </div>
        <div className="mt-5 lg:mt-0 w-full max-w-sm">
          {loading ? (
            <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
          ) : (
            <div className="bg-white border border-slate-300 rounded-lg">
              <h2 className="text-slate-700 font-bold px-4 py-2 border-b border-slate-300">
                Total Cart
              </h2>

              {/* Add Coupon Section */}
              <div className="px-4 py-2">
                <p
                  className="text-blue-600 cursor-pointer"
                  onClick={() => setShowCoupon(!showCoupon)}
                >
                  Add Coupon {showCoupon ? "▲" : "▼"}
                </p>
                {showCoupon && (
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter code"
                      className="border border-blue-500 rounded px-2 py-1 flex-grow"
                    />
                    <button
                      onClick={handleCouponApply}
                      className="bg-blue-500 text-white px-4 py-1 rounded"
                    >
                      Apply
                    </button>
                  </div>
                )}
                {isCouponApplied && (
                  <p className="text-green-600 mt-2">
                    Coupon applied successfully!
                  </p>
                )}
              </div>

              {/* Subtotal Section */}
              <div className="flex items-center justify-between px-4 py-2 text-slate-600">
                <p>Subtotal</p>
                <p className="font-medium">{displayINRCurrency(totalPrice)}</p>
              </div>

              {/* Shipping Section */}
              <div className="px-4 py-2">
                <div className="flex justify-between items-center">
                  <p>Shipping</p>
                  <p className="text-blue-600 font-medium">MIỄN PHÍ</p>
                </div>
                <p className="text-sm text-slate-400">Free shipping</p>
                <p className="text-sm text-slate-400">Shipping to Việt Nam</p>
                <p className="text-sm text-blue-600 cursor-pointer">
                  Change Address
                </p>
              </div>

              {/* Shipping Option Section */}
              <div className="px-4 py-2">
                <div className="flex items-center gap-2">
                  <input type="radio" checked readOnly />
                  <p className="text-slate-600">Free shipping</p>
                </div>
                <p className="ml-6 text-slate-400 text-sm">FREE</p>
              </div>

              {/* Total Section */}
              <div className="flex items-center justify-between px-4 py-2 font-medium text-slate-600">
                <p>TOTAL</p>
                {displayINRCurrency(
                  isCouponApplied ? totalPrice * 0.9 : totalPrice
                )}
              </div>

              {/* Payment Button */}
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default Payment;