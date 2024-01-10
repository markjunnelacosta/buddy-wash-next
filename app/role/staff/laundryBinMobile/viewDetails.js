"use client";

import { useState, useEffect } from "react";
import "./viewDetails.css";

const Details = ({ selectedOrder, onClose }) => {

    return (
        <>
            <div className="details-container-box">
                <div>
                    <p id="header">Order Details</p> <hr />
                    <div className="customer-info">
                        <p id="title">Date: </p>
                        <p>{selectedOrder.orderDate}</p>
                        <p id="title">Name: </p>
                        <p>{selectedOrder.customerName}</p>
                    </div> <hr />
                    <div className="form-group">
                        <div id="first">
                            <p id="title">Wash Mode: </p>
                            <p id="text">{selectedOrder.washMode}</p>
                            <p id="title">Detergent: </p>
                            <p id="text">{selectedOrder.detergent}</p>
                            <p id="title">Detergent Quantity: </p>
                            <p id="text">{selectedOrder.detergentQty}</p>
                            <p id="title">Total Amount: </p>
                            <p id="text">{selectedOrder.totalAmount}</p>

                        </div>
                        <div id="second">
                            <p id="title">Dry Mode: </p>
                            <p id="text">{selectedOrder.dryMode}</p>
                            <p id="title">Fabric Conditioner: </p>
                            <p id="text">{selectedOrder.fabCon}</p>
                            <p id="title">FabCon Quantity: </p>
                            <p id="text">{selectedOrder.fabConQty}</p>
                        </div>
                        <div id="third">
                            <p id="title">Fold: </p>
                            <p id="text">{selectedOrder.fold}</p>
                            <p id="title">Color: </p>
                            <p id="text">{selectedOrder.colored}</p>
                            <p id="title">Payment Method: </p>
                            <p id="text">{selectedOrder.paymentMethod}</p>
                        </div>
                    </div> <hr />
                    <div className="dl-cancel">
                        <button
                            className="cancel-button"
                            onClick={() => onClose()}
                        >
                            Cancel
                        </button>
                    </div>
                </div>

            </div>

        </>
    );
}

export default Details;