"use client";
import "./page.css";
import { useEffect, useState } from "react";
import { ItemOrder } from "../components/item-order/index";

export default function AdminPanel() {
  const [orderArray, setOrderArray] = useState([]);

  const getOrders = async () => {
    const res = await fetch("http://localhost:3005/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });
    const data = await res.json();
    setOrderArray(data);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="page">
      <h1>Панель администратора</h1>
      {orderArray.map((item, index) => (
        <ItemOrder
          name={item.name}
          phone={item.phone}
          status={item.status}
          order={item.order}
          key={index}
        />
      ))}
      test
    </div>
  );
}
