import React, { useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home />;
      case "planning":
        return <PlanningDetails />;
      case "essentials":
        return <Essentials />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="container mx-auto px-4 py-8">{renderPage()}</div>
    </div>
  );
};

const Navbar = ({ currentPage, setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const NavItem = ({ page, children }) => (
    <button
      onClick={() => {
        setCurrentPage(page);
        setIsOpen(false);
      }}
      className={`w-full text-center px-3 py-2 transition-all duration-300 ${
        currentPage === page
          ? "bg-blue-600 text-white rounded-lg shadow-md"
          : "text-blue-800 hover:bg-blue-200 hover:text-blue-900"
      }`}
    >
      {children}
    </button>
  );

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo Section */}
          <div className="flex items-center">
            <h1 className="text-3xl font-extrabold text-blue-700 tracking-tight">
              Darjeeling Journey
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <NavItem page="home">Home</NavItem>
            <NavItem page="planning">Planning</NavItem>
            <NavItem page="essentials">Essentials</NavItem>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-blue-700 hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-md rounded-lg mt-2">
            <NavItem page="home">Home</NavItem>
            <NavItem page="planning">Planning</NavItem>
            <NavItem page="essentials">Essentials</NavItem>
          </div>
        )}
      </div>
    </nav>
  );
};

const Home = () => {
  return (
    <>
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-blue-800 mb-4">
          Darjeeling Winter Expedition
        </h2>
        <p className="text-xl text-blue-600 max-w-2xl mx-auto">
          A magical journey through the misty mountains, tea gardens, and serene
          landscapes of Darjeeling
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
          <h3 className="text-2xl font-semibold text-blue-700 mb-4">
            Trip Highlights
          </h3>
          <ul className="space-y-3 text-blue-800">
            {[
              "Sunrise at Tiger Hill",
              "Mirik Lake & Lepchajagat",
              "Takdah Monastery",
              "Orange Valley Tea Garden",
            ].map((highlight, index) => (
              <li key={index} className="flex items-center">
                <span className="mr-2 text-blue-500">✦</span>
                {highlight}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
          <h3 className="text-2xl font-semibold text-blue-700 mb-4">
            Journey Timeline
          </h3>
          <div className="space-y-2 text-blue-800">
            <p>
              <strong>Departure:</strong> 26th December
            </p>
            <p>
              <strong>Return:</strong> 2nd January
            </p>
            <p>
              <strong>Total Nights:</strong> 5 Nights
            </p>
            <p>
              <strong>Key Locations:</strong> Takdah, Darjeeling, Lamahatta,
              Sittong
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const PlanningDetails = () => {
  const [ticketLink, setTicketLink] = useState("");
  const [uploadedLinks, setUploadedLinks] = useState([]);
  const [currentPDF, setCurrentPDF] = useState(null);

  const handleUpload = () => {
    if (ticketLink) {
      setUploadedLinks([...uploadedLinks, ticketLink]);
      setTicketLink("");
    }
  };

  return (
    <>
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-blue-800">Trip Planning</h2>
        <p className="text-xl text-blue-600">Manage your journey details</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-semibold text-blue-700 mb-4">
            Train Details
          </h3>
          <div className="space-y-4 text-blue-800">
            <div>
              <h4 className="font-bold">Departure Train</h4>
              <p>Garib Rath (12517) • 26th December</p>
              <p>9:45 PM: Kolkata Station</p>
              <p>7:45 AM: NJP Station</p>
            </div>
            <div>
              <h4 className="font-bold">Return Train</h4>
              <p>Kanchan Kanya (13150) • 1st January</p>
              <p>7:55 PM: Siliguri Junction</p>
              <p>8:20 AM: Arrival</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-semibold text-blue-700 mb-4">
            Ticket Links
          </h3>
          <div className="flex mb-4">
            <input
              type="text"
              value={ticketLink}
              onChange={(e) => setTicketLink(e.target.value)}
              placeholder="Paste ticket folder link"
              className="flex-grow p-2 border-2 border-blue-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleUpload}
              className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700 transition-colors"
            >
              Upload
            </button>
          </div>
          {uploadedLinks.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2 text-blue-700">
                Uploaded Links
              </h4>
              <ul className="space-y-2">
                {uploadedLinks.map((link, index) => (
                  <li
                    key={index}
                    className="bg-blue-50 p-2 rounded flex items-center justify-between hover:bg-blue-100"
                  >
                    {/* Open link in a new tab when clicking the link */}
                    <a
                      onClick={() => setCurrentPDF(link)}
                      className="text-blue-600 hover:underline truncate flex-grow"
                    >
                      Ticket Link {index + 1}
                    </a>

                    {/* Delete button */}
                    <button
                      onClick={() => {
                        const updatedLinks = uploadedLinks.filter(
                          (_, i) => i !== index
                        );
                        setUploadedLinks(updatedLinks);
                      }}
                      className="ml-4 text-red-600 hover:text-red-800"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const Essentials = () => {
  const [checkedItems, setCheckedItems] = useState({});

  const essentialItems = [
    "Warm clothing (layers)",
    "Comfortable shoes",
    "Rain jacket",
    "Medications",
    "Power bank",
    "Camera",
    "Sunglasses",
    "Toiletries",
    "Water bottle",
    "Snacks",
  ];

  const toggleCheck = (item) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  return (
    <>
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-blue-800">
          Packing Essentials
        </h2>
        <p className="text-xl text-blue-600">
          Your mountain adventure checklist
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {essentialItems.map((item, index) => (
          <div
            key={index}
            onClick={() => toggleCheck(item)}
            className={`p-4 rounded-lg shadow-md cursor-pointer transition-all duration-300 ${
              checkedItems[item]
                ? "bg-green-100 border-2 border-green-300"
                : "bg-white hover:bg-blue-50"
            }`}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={!!checkedItems[item]}
                onChange={() => toggleCheck(item)}
                className="mr-3 form-checkbox text-green-600"
              />
              <span
                className={
                  checkedItems[item] ? "line-through text-gray-500" : ""
                }
              >
                {item}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
