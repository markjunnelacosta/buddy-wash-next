"use client";

import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./orderSummary.css";

function Receipt() {
  const [loader, setLoader] = useState(false);

  const downloadPDF = () => {
    const capture = document.querySelector(".actual-receipt");
    setLoader(true);
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("p", "mm", [85, 150]); //this is for size

      doc.addImage(imgData, "PNG", 10, 10); // this is for margin
      setLoader(false);
      doc.save("receipt.pdf");
    });
  };

  return (
    <div className="container">
      <div className="receipt-box">
        {/* actual receipt */}
        <div className="actual-receipt">
          {/* HEADER */}
          <div>
            <h3 className="header">ORDER SUMMARY</h3>
          </div>

          {/* INFO */}
          <div>
            <h6>Date</h6>
            <p>try lang</p>

            <h6>Customer Name</h6>
            <p>try lang</p>

            <h6>Phone Number</h6>
            <p>try lang</p>

            <h6>Weight</h6>
            <p>try lang</p>

            <h6>Wash Mode</h6>
            <div className="with-price">
              <p>try lang</p>
              <p>50</p>
            </div>

            <h6>Dry Mode</h6>
            <div className="with-price">
              <p>try lang</p>
              <p>50</p>
            </div>

            <h6>Fold</h6>
            <div className="with-price">
              <p>try lang</p>
              <p>50</p>
            </div>

            <h6>Detergent</h6>
            <p>try lang</p>

            <h6>Quantity</h6>
            <div className="with-price">
              <p>try lang</p>
              <p>50</p>
            </div>

            <h6>Fabric Conditioner</h6>
            <p>try lang</p>

            <h6>Quantity</h6>
            <div className="with-price">
              <p>try lang</p>
              <p>50</p>
            </div>

            <h6>Payment Method</h6>
            <p>try lang</p>

            <h6>Reference Number</h6>
            <p>try lang</p>
          </div>
        </div>
      </div>
      {/* receipt action */}
      <div className="receipt-actions-div">
        <div className="actions-right">
          <button
            className="receipt-modal-download-button"
            onClick={downloadPDF}
            disabled={!(loader === false)}
          >
            {loader ? <span>Downloading</span> : <span>Download</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Receipt;
