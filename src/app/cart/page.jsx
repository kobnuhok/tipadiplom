"use client";
import "./page.css";
import { useEffect, useState } from "react";
import OrderModal from "../components/modal/order";
import { ItemCart } from "../components/item-cart/index";

export default function Cart() {
  const [cartArray, setCartArray] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [user, setUser] = useState({
    name: "",
    phone: "",
  });

  useEffect(() => {
    const storedData = localStorage.getItem("dataBuild");
    if (!storedData) {
      localStorage.setItem("dataBuild", JSON.stringify({}));
    } else {
      const dataObj = JSON.parse(storedData);
      const data = Object.values(dataObj)
        .flatMap((section) => Object.values(section))
        .filter((item) => item.priceJob > 0 && item.priceMaterial > 0);

      setCartArray(data);
    }
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setStatus(false);
  };

  const send = async () => {
    const res = await fetch("http://localhost:3005/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        name: user.name || null,
        phone: user.phone || null,
        order: cartArray || null,
        status: "created",
      }),
    });
    const data = await res.json();
    setStatus(data.status);
  };

  const handleUser = (e) => {
    const { value, name } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div className="page">
      <h1>Корзина</h1>
      <div className="basket-table">
        <div className="basket-table__row">
          <div className="basket-table__head-item basket-table__head-item--first"></div>
          <div className="basket-table__head-item">Услуга</div>
          <div className="basket-table__head-item">Цена за услуги</div>
          <div className="basket-table__head-item">Цена за материалы</div>
          <div className="basket-table__head-item">Сумма</div>
        </div>
        {cartArray.map((item, index) => (
          <ItemCart
            nameJob={item.nameJob}
            priceJob={item.priceJob}
            priceMaterial={item.priceMaterial}
            key={index}
          />
        ))}
      </div>
      <footer className="basket__footer">
        <div id="back-calculate">Вернуться к работам</div>
        <div className="basket__total-price">
          <span>Итоговая стоимость: </span>
          <span>
            {cartArray
              .reduce(
                (acc, item) => item.priceJob + item.priceMaterial + acc,
                0
              )
              .toLocaleString("ru-RU")}
            ₽
          </span>
        </div>
        <button className="basket__btn" onClick={handleOpenModal}>
          Оформление заказа
        </button>
      </footer>
      <OrderModal show={isModalOpen} onClose={handleCloseModal}>
        {status === "ok" ? (
          <div>
            <h1>Успешно</h1>
            <span>Ваш заказ успешно создан. Ожидайте звонка оператора</span>
            <button className="order__button" onClick={handleCloseModal}>
              Закрыть
            </button>
          </div>
        ) : status === "error" ? (
          <div>
            <h1>Ошибка </h1>
            <span>
              Что-то пошло не так. попробуйте еще раз отправить заявку
            </span>
            <button className="order__button" onClick={handleCloseModal}>
              Закрыть
            </button>
          </div>
        ) : (
          <>
            <h2>Отправить заявку</h2>
            <div className="order">
              <label htmlFor="name">
                <span className="order__label">Имя</span>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={user.name}
                  onChange={handleUser}
                />
              </label>
              <label htmlFor="phone">
                <span className="order__label">Телефон</span>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={user.phone}
                  onChange={handleUser}
                />
              </label>
              <button className="order__button" onClick={send}>
                Отправить расчет
              </button>
            </div>
          </>
        )}
      </OrderModal>
    </div>
  );
}
