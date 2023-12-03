"use client";

import { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./orderSummary.css";

function Receipt({ selectedOrder, onClose }) {
  const [loader, setLoader] = useState(false);

  const downloadPDF = () => {
    const capture = document.querySelector(".actual-receipt");
    setLoader(true);

    const scale = 2;
    html2canvas(capture, { scale: scale }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 1.0); // Use JPEG for better quality
      const doc = new jsPDF("p", "mm", [85, 150]); // this is for size

      doc.addImage(imgData, "JPEG", 5, 5, 75, 130, undefined, "FAST"); // Adjusted position and dimensions

      setLoader(false);
      // doc.save("receipt.pdf");
      doc.autoPrint();
      window.open(doc.output("bloburl"), "_blank");
    });
  };


  return (
    <div className="container-receipt">
      <div className="receipt-box">
        <div className="actual-receipt">
          <div>
            <h4 id="asterisk">****************************</h4>
            <h3 id="receipt">BUDDYWASH-RECEIPT</h3>
            <h4 id="asterisk">****************************</h4>
            <h4 className="header">ORDER SUMMARY</h4>
          </div>

          <div>
            <h6 id="h6">Date:</h6>
            <p id="text">{selectedOrder?.orderDate}</p>

            <h6 id="h6">Customer Name:</h6>
            <p id="text">{selectedOrder?.customerName}</p>

            <h6 id="h6">Weight:</h6>
            <p id="text">{selectedOrder?.weight}</p>

            <h6 id="h6">Wash Mode:</h6>
            <div className="with-price">
              <p id="text">{selectedOrder?.washMode}</p>
            </div>

            <h6 id="h6">Dry Mode:</h6>
            <div className="with-price">
              <p id="text">{selectedOrder?.dryMode}</p>
            </div>

            <h6 id="h6">Fold:</h6>
            <div className="with-price">
              <p id="text">{selectedOrder?.fold}</p>
            </div>

            <h6 id="h6">Detergent:</h6>
            <p id="text">{selectedOrder?.detergent}</p>

            <h6 id="h6">Quantity:</h6>
            <div className="with-price">
              <p id="text">{selectedOrder?.detergentQty}</p>
            </div>

            <h6 id="h6">Fabric Conditioner:</h6>
            <p id="text">{selectedOrder?.fabCon}</p>

            <h6 id="h6">Quantity:</h6>
            <div className="with-price">
              <p id="text">{selectedOrder?.fabConQty}</p>
            </div>
            <h4 id="asterisk">---------------------------------</h4>
            <h6 id="h6">Payment Method:</h6>
            <p id="text">{selectedOrder?.paymentMethod}</p>
            <h6 id="h6">Total Amount:</h6>
            <p id="text">{selectedOrder?.totalAmount}</p>
            <h4 id="asterisk">---------------------------------</h4>
            <h4 id="asterisk">******** THANK YOU ********</h4>
          </div>
        </div>
      </div>
      <div className="buttons">
      <div className="dl-cancel">
          <button
            className="cancel-button"
            onClick={() => onClose}
          >
            Cancel
          </button>
        </div>
        <div className="dl">
          <button
            className="download-button"
            onClick={downloadPDF}
            disabled={!(loader === false)}
          >
            {loader ? <span>Printing</span> : <span>Print</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Receipt;
