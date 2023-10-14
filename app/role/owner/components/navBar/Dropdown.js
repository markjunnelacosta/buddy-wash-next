"use client"
import { useState } from "react";
import {
    List,
    Divider,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Grid,
    Paper,
  } from "@mui/material";
  import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
  import GroupsIcon from '@mui/icons-material/Groups';
  import SellIcon from '@mui/icons-material/Sell';
  import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';

function Dropdown({ name }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <button onClick={() => setIsOpen((prev) => !prev)}
            >
                {name}
            </button>
            {isOpen && (<div>
                <div>
                    <ListItemButton className="button" href="/role/owner/components/main/branch1/Transactions">
                        <ListItemIcon className="button-content">
                            <ReceiptLongIcon />
                        </ListItemIcon>
                        <ListItemText primary="Transactions" />
                    </ListItemButton>

                    <ListItemButton className="button" href="/role/owner/components/main/branch1/Staff">
                        <ListItemIcon className="button-content">
                            <GroupsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Staff" />
                    </ListItemButton>

                    <ListItemButton className="button" href="/role/owner/components/main/branch1/Prices">
                        <ListItemIcon className="button-content">
                            <SellIcon />
                        </ListItemIcon>
                        <ListItemText primary="Prices" />
                    </ListItemButton>

                    <ListItemButton className="button" href="/role/owner/components/main/branch1/Machines">
                        <ListItemIcon className="button-content">
                            <LocalLaundryServiceIcon />
                        </ListItemIcon>
                        <ListItemText primary="Machines" />
                    </ListItemButton>
                </div>
            </div>)}
        </div>
    )
}
export default Dropdown; 
