import React, { useState, useContext } from "react";
import { FiShoppingCart } from "react-icons/fi";
import records from "../record/record.json";
import PremierContext from '../context/premierContext';

const MenuItems = () => {
    const [selectedItems, setSelectedItems] = useState({});
    const { menuTotalPrice, setMenuTotalPrice } = useContext(PremierContext);

    const handleSelection = (item, action) => {
        setSelectedItems((prev) => {
            const newItems = { ...prev };
            if (action === "add") {
                newItems[item.name] = newItems[item.name]
                    ? { ...newItems[item.name], quantity: newItems[item.name].quantity + 1 }
                    : { ...item, quantity: 1 };
            } else if (action === "remove" && newItems[item.name]) {
                if (newItems[item.name].quantity === 1) {
                    delete newItems[item.name];
                } else {
                    newItems[item.name].quantity -= 1;
                }
            }
            return newItems;
        });
    };

    React.useEffect(() => {
        const total = Object.values(selectedItems).reduce((sum, item) => sum + item.cost * item.quantity, 0);
        setMenuTotalPrice(total);
    }, [selectedItems, setMenuTotalPrice]);

    return (
        <div style={{
            width: "400px", height: "450px", position: "absolute", top: "30px", left: "30px", zIndex: "100",
            maxHeight: "450px", overflowY: "auto", borderRadius: "10px", backgroundColor: "#fff",
            padding: "15px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", fontFamily: "Arial, sans-serif"
        }}>
            <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                borderBottom: "2px solid #ddd", paddingBottom: "10px", marginBottom: "10px"
            }}>
                <h2 style={{ color: "#333", margin: 0, fontSize: "25px" }}>Menu Items</h2>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h2 style={{ color: "#333", margin: "0 5px", fontSize: "20px" }}>₹{menuTotalPrice}</h2>
                    <FiShoppingCart size={20} color="#333" />
                </div>
            </div>

            <div>
                {Array.isArray(records.items) ? (
                    records.items.map((item, index) => {
                        const selectedItem = selectedItems[item.name] || { quantity: 0 };
                        return (
                            <div key={index} style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: '15px',
                                padding: '12px',
                                backgroundColor: '#f9f9f9',
                                borderRadius: '8px',
                                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)'
                            }}>
                                {/* Image & Checkbox */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: '0 0 auto' }}>
                                    <input
                                        type="checkbox"
                                        checked={selectedItem.quantity > 0}
                                        onChange={(e) => handleSelection(item, e.target.checked ? "add" : "remove")}
                                        style={{ transform: 'scale(1.2)'}}
                                    />
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        style={{
                                            width: '60px',
                                            height: '60px',
                                            objectFit: 'cover',
                                            borderRadius: '6px',
                                            
                                        }}
                                    />
                                </div>
                            
                                {/* Text Info */}
                                <div style={{ flex: 1, marginLeft: '15px' }}>
                                    <p style={{ margin: 0, fontWeight: 'bold', fontSize: '16px', color: '#333' }}>{item.name}</p>
                                    <p style={{ margin: '5px 0 0', fontSize: '14px', color: '#777' }}>₹{item.cost}</p>
                                </div>
                            
                                {/* Quantity Buttons */}
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <button onClick={() => handleSelection(item, "remove")} style={{
                                        padding: '6px 10px',
                                        backgroundColor: '#f44336',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}>-</button>
                            
                                    <span style={{ margin: '0 8px', fontWeight: 'bold', fontSize: '16px' }}>{selectedItem.quantity}</span>
                            
                                    <button onClick={() => handleSelection(item, "add")} style={{
                                        padding: '6px 10px',
                                        backgroundColor: '#4CAF50',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}>+</button>
                                </div>
                            </div>
                            
                        );
                    })
                ) : (
                    <p style={{ textAlign: "center", color: "#999" }}>No items found.</p>
                )}
            </div>
        </div>
    );
};

export default MenuItems;
