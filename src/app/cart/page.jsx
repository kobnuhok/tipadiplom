import "./page.css";
import { ItemCart } from "../components/item-cart/index";

export default function Cart() {
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
        <ItemCart />
      </div>
      <footer className="basket__footer">
        <div id="back-calculate">Вернуться к работам</div>
        <div className="basket__total-price">
          <span>Итоговая стоимость:</span>
          <span>456</span>
        </div>
        <button className="basket__btn">Оформление заказа</button>
      </footer>
    </div>
  );
}
