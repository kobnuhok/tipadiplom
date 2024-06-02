import "../../cart/page.css";

export const ItemCart = ({ nameJob, priceJob, priceMaterial }) => {
  return (
    <div className="basket-table__row">
      {/* <input
        type="checkbox"
        className="basket-table__head-item basket-table__head-item--first"
      /> */}
      <div></div>
      <div className="basket-table__item">{nameJob}</div>
      <div className="basket-table__item">
        {priceJob.toLocaleString("ru-RU")}₽
      </div>
      <div className="basket-table__item">
        {priceMaterial.toLocaleString("ru-RU")}₽
      </div>
      <div className="basket-table__item">
        {(priceJob + priceMaterial).toLocaleString("ru-RU")}₽
      </div>
    </div>
  );
};
