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
                        <p>date</p>
                        <p id="title">Name: </p>
                        <p>name</p>
                    </div> <hr />
                    <div className="form-group">
                        <div id="first">
                            <p id="title">Address: </p>
                            <p id="text">{selectedOrder.deliveryAddress}</p>
                            <p id="title">Wash Mode: </p>
                            <p id="text">{selectedOrder.washMode}</p>
                            <p id="title">Detergent: </p>
                            <p id="text">{selectedOrder.detergentType}</p>
                            <p id="title">Detergent Quantity: </p>
                            <p id="text">{selectedOrder.detergentQty}</p>

                        </div>
                        <div id="second">
                            <p id="title">Branch: </p>
                            <p id="text">{selectedOrder.branch}</p>
                            <p id="title">Dry Mode: </p>
                            <p id="text">{selectedOrder.dryMode}</p>
                            <p id="title">Fabric Conditioner: </p>
                            <p id="text">{selectedOrder.fabricType}</p>
                            <p id="title">FabCon Quantity: </p>
                            <p id="text">{selectedOrder.fabricType}</p>
                        </div>
                        <div id="third">
                            <p id="title">Payment Method: </p>
                            <p id="text">{selectedOrder.paymentMethod}</p>
                            <p id="title">Fold: </p>
                            <p id="text">{selectedOrder.fold}</p>
                            <p id="title">Color: </p>
                            <p id="text">{selectedOrder.color}</p>
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