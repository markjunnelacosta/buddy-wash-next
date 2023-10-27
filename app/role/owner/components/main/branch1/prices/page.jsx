"use client";
import React, { useState, useEffect } from "react";
import "./price.css";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import OwnerPage from "./add-product/page";
import Button from "@mui/material/Button";
import RemoveButton from "./removeButton";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import UpdateProduct from "./edit-product/page";
import EditProductPopup from "./editButton";

// Function to fetch product data from the server
const getProducts = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/product", {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch products");
        }

        const response = await res.json();
        return response.productData || [];
    } catch (error) {
        console.log("Error loading products: ", error);
    }
};

const Products = () => {
    const [productData, setProductData] = useState([]);
    const [showOwnerPage, setShowOwnerPage] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isUpdateProductPopupVisible, setUpdateProductPopupVisible] = useState(false);

    // Function to open the owner page
    const openOwnerPage = () => {
        setShowOwnerPage(true);
    };

    // Function to close the owner page
    const closeOwnerPage = () => {
        setShowOwnerPage(false);
    };

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setUpdateProductPopupVisible(true); // Show the popup
    };

    const handleClose = () => {
        setUpdateProductPopupVisible(false); // Hide the popup
    };

    // Use an effect to fetch product data when the component mounts
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const product = await getProducts();
                setProductData(product);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, []);

    // Log the product data for debugging
    useEffect(() => {
        console.log(productData);
    }, [productData]);

    const fetchData = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/product", {
                cache: "no-store",
            });

            if (!res.ok) {
                throw new Error("Failed to fetch products");
            }

            const response = await res.json();
            const product = response.productData || [];
            setProductData(product); // Assuming you want to update the product data in your component state
        } catch (error) {
            console.log("Error loading products: ", error);
        }
    };

    const handleSaveData = () => {
        closeOwnerPage(); // Close the OwnerPage
        fetchData();
    };

    return (
        <>
            <div className="container-box">
                <div className="button-container">
                    <button className="add-button" onClick={openOwnerPage}>
                        <AddRoundedIcon /> New Product
                    </button>
                </div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(productData) && productData.length > 0 ? (
                                productData.map((product) => (
                                    <tr key={product._id}>
                                        <td>{product.productName}</td>
                                        <td>{product.productPrice}</td>
                                        <td>
                                            <div className="b-container">
                                                <Button
                                                    variant="outlined"
                                                    id="edit-button"
                                                    onClick={() => handleEditProduct(product)}
                                                >
                                                    Edit
                                                </Button>
                                                &nbsp;
                                                <RemoveButton id={product._id} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3">No products available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <OwnerPage
                isOpen={showOwnerPage}
                onClose={handleSaveData}
                onSaveData={handleSaveData}
            />
            {/* Render the EditProductPopup with the selected product */}
            <EditProductPopup
                isOpen={isUpdateProductPopupVisible}
                product={selectedProduct}
                onClose={handleClose}
                onSave={handleSaveData} // Implement the save function
            />
        </>
    );
};

export default Products;


// "use client";
// import React, { useState, useEffect } from "react";
// import "./page.css";
// import AddRoundedIcon from "@mui/icons-material/AddRounded";
// import OwnerPage from "./add-product/page";
// import Button from "@mui/material/Button";
// import RemoveButton from "./removeButton";
// import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
// import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
// import UpdateProduct from "./edit-product/page";
// import EditProductPopup from "./editButton";

// // Function to fetch product data from the server
// const getProducts = async () => {
//   try {
//     const res = await fetch("http://localhost:3000/api/product", {
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       throw new Error("Failed to fetch products");
//     }

//     const response = await res.json();
//     return response.productData || [];
//   } catch (error) {
//     console.log("Error loading products: ", error);
//   }
// };

// const Products = () => {
//   const [productData, setProductData] = useState([]);
//   const [showOwnerPage, setShowOwnerPage] = useState(false);
//   const [entriesPerPage, setEntriesPerPage] = useState(5);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [searchQuery, setSearchQuery] = useState(''); // State for search query
//   const [isUpdateProductPopupVisible, setUpdateProductPopupVisible] = useState(false);

//   // Calculate total number of pages based on the data and entries per page
//   const totalPages = Math.ceil(productData.length / entriesPerPage);

//   // Calculate the start and end range for displayed entries
//   const startRange = (currentPage - 1) * entriesPerPage + 1;
//   const endRange = Math.min(currentPage * entriesPerPage, productData.length);

//   // Function to handle going to the previous page
//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   // Function to handle going to the next page
//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   // Function to handle changing the number of entries per page
//   const handleEntriesPerPageChange = (event) => {
//     setEntriesPerPage(event.target.value);
//   };

//   // Function to open the owner page
//   const openOwnerPage = () => {
//     setShowOwnerPage(true);
//   };

//   // Function to close the owner page
//   const closeOwnerPage = () => {
//     setShowOwnerPage(false);
//   };

//   const handleEditProduct = (product) => {
//     setSelectedProduct(product);
//     setUpdateProductPopupVisible(true); // Show the popup
//   };

//   const handleClose = () => {
//     setUpdateProductPopupVisible(false); // Hide the popup
//   };

//    // Filter products based on search query
//    const filteredProducts = productData.filter((product) =>
//    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
//  );


//   // Use an effect to fetch product data when the component mounts
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const product = await getProducts();
//         setProductData(product);
//       } catch (error) {
//         console.error("Error fetching product:", error);
//       }
//     };

//     fetchProduct();
//   }, []);

//   // Log the product data for debugging
//   useEffect(() => {
//     console.log(productData);
//   }, [productData]);

//   const fetchData = async () => {
//     try {
//       const res = await fetch("http://localhost:3000/api/product", {
//         cache: "no-store",
//       });

//       if (!res.ok) {
//         throw new Error("Failed to fetch products");
//       }

//       const response = await res.json();
//       const product = response.productData || [];
//       setProductData(product); // Assuming you want to update the product data in your component state
//     } catch (error) {
//       console.log("Error loading products: ", error);
//     }
//   };

//   const handleSaveData = () => {
//     closeOwnerPage(); // Close the OwnerPage
//     fetchData();
//   };

//   return (
//     <>
//       <div className="container-box">
//         <div className="searchContainer">
//           <div className="searchContainer-right">
//             <p style={{ fontWeight: "bold" }}>Search</p>
//           </div>
//           <div className="button-container">
//             <button className="add-button" onClick={openOwnerPage}>
//               <AddRoundedIcon /> Add New Product
//             </button>
//           </div>
//         </div>
//         <div className="table-container">
//           <table>
//             <thead>
//               <tr>
//                 <th>Product</th>
//                 <th>Price</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredProducts
//                 .slice(
//                   (currentPage - 1) * entriesPerPage,
//                   currentPage * entriesPerPage
//                 )
//                 .map((product) => (
//                   <tr key={product._id}>
//                     <td>{product.productName}</td>
//                     <td>{product.productPrice}</td>
//                     <td>
//                       <div className="b-container">
//                         <Button
//                           variant="outlined"
//                           id="edit-button"
//                         //   href={`/role/owner/components/main/branch1/prices/edit-product/${product._id}`}
//                           onClick={() => handleEditProduct(product)}
//                         >
//                           Edit
//                         </Button>
//                         &nbsp;
//                         <RemoveButton id={product._id} />
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="pagination">
//           <button onClick={handlePreviousPage} disabled={currentPage === 1}>
//             <ArrowBackIosRoundedIcon />
//           </button>
//           <span>{`Showing entries ${startRange}-${endRange} of ${filteredProducts.length}`}</span>
//           <button
//             onClick={handleNextPage}
//             disabled={currentPage === totalPages}
//           >
//             <ArrowForwardIosRoundedIcon />
//           </button>
//         </div>
//       </div>
//       <OwnerPage
//         isOpen={showOwnerPage}
//         onClose={handleSaveData}
//         onSaveData={handleSaveData}
//       />
//       {/* Render the EditProductPopup with the selected product */}
//       <EditProductPopup
//         isOpen={isUpdateProductPopupVisible}
//         product={selectedProduct}
//         onClose={handleClose}
//         onSave={handleSaveData} // Implement the save function
//       />
//     </>
//   );
// };

// export default Products;
