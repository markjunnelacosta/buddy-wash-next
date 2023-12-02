"use client";
import React, { useEffect, useState } from "react";

const getSupplies = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/BRANCH2/branch2upply", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch supplies");
    }

    // console.log(await res.json());
    const response = await res.json();
    return response.supplies;
  } catch (error) {
    console.log("Error loading customers: ", error);
  }
};

function ProductSelection() {
  const [supplies, setSupplies] = React.useState([]);
  const [selected, setSelected] = useState();

  React.useEffect(() => {
    const fetchSupplies = async () => {
      try {
        const suppliesData = await getSupplies();
        setSupplies(suppliesData);
      } catch (error) {
        console.error("Error fetching supplies:", error);
      }
    };

    fetchSupplies();
  }, []);

  React.useEffect(() => {}, [supplies]);

  console.log({ supplies });
  return (
    <div>
      <select onChange={(e) => setSelected(e.target.value)}>
        {supplies.map((supply, i) => (
          <option key={i}>{supply.supplyName}</option>
        ))}
      </select>
      {/* <h1>{selected}</h1> */}
    </div>
  );
}

export default ProductSelection;
