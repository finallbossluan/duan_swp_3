import React, { useEffect, useState } from "react";
import SummaryApi from "../common/index";
import { toast } from "react-toastify";
import { CgClose } from "react-icons/cg";
import moment from "moment";

const AllDiscounts = () => {
  const [allDiscounts, setAllDiscounts] = useState([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [data, setData] = useState({
    nameDiscount: "",
    codeDiscount: "",
    content: "",
    value: "",
    expirationDate: "",
  });

  // Fetch all discounts
  const fetchAllDiscounts = async () => {
    try {
      const response = await fetch(SummaryApi.allDiscount.url, {
        method: SummaryApi.allDiscount.method,
        credentials: "include",
      });

      const dataResponse = await response.json();
      if (response.ok && dataResponse.success) {
        setAllDiscounts(dataResponse.data);
      } else {
        toast.error(dataResponse.message || "Failed to fetch discounts");
      }
    } catch (error) {
      toast.error("Failed to fetch discounts");
      console.error("Error fetching discounts:", error);
    }
  };

  useEffect(() => {
    fetchAllDiscounts();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.codeDiscount) {
      toast.error("Code discount is required.");
      return;
    }

    try {
      const response = await fetch(SummaryApi.uploadDiscount.url, {
        method: SummaryApi.uploadDiscount.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        toast.success(result.message);
        fetchAllDiscounts();
        setShowUploadForm(false);
      } else {
        toast.error(result.message || "Failed to upload discount");
      }
    } catch (error) {
      console.error("Error uploading discount:", error);
      toast.error("Failed to upload discount.");
    }
  };

  return (
    <div className="bg-white pb-4">
      <div className="flex justify-between items-center p-4">
        <h2 className="font-bold text-lg">All Discounts</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setShowUploadForm(true)}
        >
          Upload Discount
        </button>
      </div>

      <table className="w-full userTable">
        <thead>
          <tr className="bg-black text-white">
            <th>STT</th>
            <th>Name</th>
            <th>Code</th>
            <th>Content</th>
            <th>Value (%)</th>
            <th>Expiration Date</th>
          </tr>
        </thead>
        <tbody>
          {allDiscounts.map((discount, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{discount.nameDiscount}</td>
              <td>{discount.codeDiscount}</td>
              <td>{discount.content}</td>
              <td>{discount.value}%</td>
              <td>{moment(discount.expirationDate).format("LL")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showUploadForm && (
        <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 flex justify-center items-center">
          <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
            <div className="flex justify-between items-center pb-3">
              <h2 className="font-bold text-lg">Upload Discount</h2>
              <CgClose
                className="text-2xl hover:text-red-600 cursor-pointer"
                onClick={() => setShowUploadForm(false)}
              />
            </div>

            <form
              className="grid p-4 gap-2 overflow-y-scroll h-full pb-5"
              onSubmit={handleSubmit}
            >
              <label htmlFor="nameDiscount">Name:</label>
              <input
                type="text"
                id="nameDiscount"
                name="nameDiscount"
                value={data.nameDiscount}
                onChange={handleOnChange}
                className="p-2 bg-slate-100 border rounded"
                required
              />

              <label htmlFor="codeDiscount">Code:</label>
              <input
                type="text"
                id="codeDiscount"
                name="codeDiscount"
                value={data.codeDiscount}
                onChange={handleOnChange}
                className="p-2 bg-slate-100 border rounded"
                required
              />

              <label htmlFor="content">Content:</label>
              <textarea
                name="content"
                id="content"
                value={data.content}
                onChange={handleOnChange}
                rows="3"
                className="p-2 bg-slate-100 border rounded"
                required
              ></textarea>

              <label htmlFor="value">Value (%):</label>
              <input
                type="number"
                id="value"
                name="value"
                value={data.value}
                onChange={handleOnChange}
                className="p-2 bg-slate-100 border rounded"
                required
              />

              <label htmlFor="expirationDate">Expiration Date:</label>
              <input
                type="date"
                id="expirationDate"
                name="expirationDate"
                value={data.expirationDate}
                onChange={handleOnChange}
                className="p-2 bg-slate-100 border rounded"
                required
              />

              <button className="px-3 py-2 bg-blue-600 text-white mt-4 hover:bg-blue-700">
                Upload Discount
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllDiscounts;
