import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import TestimonialManager from "./TestimonialManager";
import InvoiceGenerator from "./InvoiceGenerator"; 
import CaseStudyManager from "./CaseStudyManager";
import PortfolioManager from "./PortfolioManager"; 

const AdminPanel = () => {
  
  const [activeSection, setActiveSection] = useState("testimonials");

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      
      <div className="w-64 bg-white border-r border-gray-200 shadow-lg p-6 space-y-6 transition-all duration-200 ease-in-out">
        <h2 className="text-2xl font-bold text-blue-700 flex items-center gap-2 pb-4 border-b border-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Admin
        </h2>
        <nav className="flex flex-col space-y-2">
        <button
            onClick={() => setActiveSection("testimonials")}
            className={`text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-2 ${
              activeSection === "testimonials"
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Testimonials
          </button>
          <button
            onClick={() => setActiveSection("invoices")}
            className={`text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-2 ${
              activeSection === "invoices"
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Invoices
          </button>
          
          <button
            onClick={() => setActiveSection("case-studies")}
            className={`text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-2 ${
              activeSection === "case-studies"
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Case Studies
          </button>
          <button
            onClick={() => setActiveSection("portfolio")}
            className={`text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-2 ${
              activeSection === "portfolio"
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Portfolio
          </button>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-10 w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>

     
      <div className="flex-1 p-8">
        <div className="bg-white rounded-xl shadow-lg p-6 min-h-[calc(100vh-4rem)]">
          {activeSection === "testimonials" && <TestimonialManager />}
          {activeSection === "invoices" && <InvoiceGenerator />}
          {activeSection === "case-studies" && <CaseStudyManager />}
          {activeSection === "portfolio" && <PortfolioManager />}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;