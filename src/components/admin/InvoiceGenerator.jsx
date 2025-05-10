import React, { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const InvoiceGenerator = () => {
  const [formData, setFormData] = useState({
    invoiceNo: `INV-${new Date().getTime()}`,
    date: new Date().toISOString().substr(0, 10),
    poNumber: "",
    poDate: "",
    modeOfTransport: "",
    vehicleNo: "",
    placeOfSupply: "",
    clientName: "",
    billingAddress: "",
    shippingAddress: "",
    notes: "",
  });

  const [items, setItems] = useState([{ description: "", quantity: 1, rate: 0 }]);
  const [saving, setSaving] = useState(false);
  const [savedInvoice, setSavedInvoice] = useState(null);

  const companyInfo = {
    name: "VIGHNAHARTA ENGINEERS",
    gstin: "27AAKFV7481P1ZC",
    vendorCode: "V001",
    uan: "MH19A0001234",
    address: "Gat No. 123, Pune-Nashik Highway, Pune, Maharashtra - 412105"
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = field === "description" ? value : parseFloat(value) || 0;
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, rate: 0 }]);
  };

  const getSubtotal = () => items.reduce((acc, item) => acc + item.quantity * item.rate, 0);
  const getGST = () => getSubtotal() * 0.18;
  const getTotal = () => getSubtotal() + getGST();

  const handleSave = async () => {
    setSaving(true);
    try {
      const invoice = {
        ...formData,
        items,
        subtotal: getSubtotal(),
        gst: getGST(),
        total: getTotal(),
        createdAt: Timestamp.now(),
        companyInfo
      };
      const docRef = await addDoc(collection(db, "invoices"), invoice);
      alert(`✅ Invoice saved with ID: ${docRef.id}`);
      setSavedInvoice(invoice);
    } catch (error) {
      console.error("Error saving invoice:", error);
      alert("Error saving invoice");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-gray-100 p-4 min-h-screen">
      
      <div
        className="mx-auto bg-white"
        style={{
          width: "210mm",
          minHeight: "297mm",
          padding: "40px 30px",
          boxSizing: "border-box",
        }}
      >
        
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Invoice</h1>
            <p className="text-sm text-gray-700">{companyInfo.name}</p>
            <p className="text-xs text-gray-600">GSTIN: {companyInfo.gstin} | UAN: {companyInfo.uan}</p>
          </div>
          <div className="text-sm text-gray-700">
            <label className="block">
              <span className="font-semibold">Invoice No:</span>
              <input name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} className="border ml-2 p-1 text-xs" />
            </label>
            <label className="block">
              <span className="font-semibold">Date:</span>
              <input type="date" name="date" value={formData.date} onChange={handleChange} className="border ml-2 p-1 text-xs" />
            </label>
          </div>
        </div>

        
        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div>
            <label>PO Number</label>
            <input name="poNumber" value={formData.poNumber} onChange={handleChange} className="w-full border p-1 rounded" />
          </div>
          <div>
            <label>PO Date</label>
            <input type="date" name="poDate" value={formData.poDate} onChange={handleChange} className="w-full border p-1 rounded" />
          </div>
          <div>
            <label>Mode of Transport</label>
            <input name="modeOfTransport" value={formData.modeOfTransport} onChange={handleChange} className="w-full border p-1 rounded" />
          </div>
          <div>
            <label>Vehicle No</label>
            <input name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} className="w-full border p-1 rounded" />
          </div>
          <div>
            <label>Place of Supply</label>
            <input name="placeOfSupply" value={formData.placeOfSupply} onChange={handleChange} className="w-full border p-1 rounded" />
          </div>
        </div>

        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label>Billing To</label>
            <input name="clientName" value={formData.clientName} onChange={handleChange} className="w-full border p-1 rounded" />
            <textarea name="billingAddress" value={formData.billingAddress} onChange={handleChange} className="w-full border mt-1 p-1 rounded" rows={3} />
          </div>
          <div>
            <label>Shipping To</label>
            <textarea name="shippingAddress" value={formData.shippingAddress} onChange={handleChange} className="w-full border p-1 rounded" rows={4} />
          </div>
        </div>

        
        <div>
          <h2 className="text-lg font-semibold mb-2">Invoice Items</h2>
          <table className="w-full table-auto border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2 text-left">Description</th>
                <th className="border px-3 py-2 text-left">Quantity</th>
                <th className="border px-3 py-2 text-left">Rate (₹)</th>
                <th className="border px-3 py-2 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="border px-3 py-1">
                    <input type="text" value={item.description} onChange={(e) => handleItemChange(index, "description", e.target.value)} className="w-full bg-transparent focus:outline-none" />
                  </td>
                  <td className="border px-3 py-1">
                    <input type="number" value={item.quantity} onChange={(e) => handleItemChange(index, "quantity", e.target.value)} className="w-full bg-transparent focus:outline-none" />
                  </td>
                  <td className="border px-3 py-1">
                    <input type="number" value={item.rate} onChange={(e) => handleItemChange(index, "rate", e.target.value)} className="w-full bg-transparent focus:outline-none" />
                  </td>
                  <td className="border px-3 py-1 text-right">₹{(item.quantity * item.rate).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={addItem} className="text-blue-600 text-sm mt-2 hover:underline">+ Add Item</button>
        </div>

       
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea name="notes" value={formData.notes} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
        </div>

        <div className="text-right mt-6 space-y-1">
          <p className="text-sm">Subtotal: ₹{getSubtotal().toFixed(2)}</p>
          <p className="text-sm">GST (18%): ₹{getGST().toFixed(2)}</p>
          <p className="text-lg font-bold">Grand Total: ₹{getTotal().toFixed(2)}</p>
        </div>

        <div className="mt-12 text-right">
          <div className="mt-8 h-10 border-b border-gray-400 w-48 float-right" />
          <p className="text-sm">Authorized Signatory</p>
        </div>
      </div>

     
      <div className="mt-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      
      {savedInvoice && (
        <div className="mt-12 bg-white shadow p-6">
          <h2 className="text-2xl font-bold mb-4">📄 Saved Invoice Preview</h2>
          <p><strong>Invoice No:</strong> {savedInvoice.invoiceNo}</p>
          <p><strong>Date:</strong> {savedInvoice.date}</p>
          <p><strong>Client:</strong> {savedInvoice.clientName}</p>
          <p><strong>Total:</strong> ₹{savedInvoice.total.toFixed(2)}</p>
          <h3 className="text-lg font-semibold mt-4">Items:</h3>
          <ul className="list-disc ml-6">
            {savedInvoice.items.map((item, idx) => (
              <li key={idx}>
                {item.description} - {item.quantity} × ₹{item.rate.toFixed(2)} = ₹{(item.quantity * item.rate).toFixed(2)}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-sm italic text-gray-500">Notes: {savedInvoice.notes || "None"}</p>
        </div>
      )}
    </div>
  );
};

export default InvoiceGenerator;
