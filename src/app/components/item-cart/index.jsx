import "../../cart/page.css";

export const ItemCart = ({service=5, priceService=6, priceMaterial=9, total=78}) => {
  return (
    <div className="basket-table__row">
      <input
        type="checkbox"
        className="basket-table__head-item basket-table__head-item--first"
      />
      <div className="basket-table__item">{service}</div>
      <div className="basket-table__item">{priceService}</div>
      <div className="basket-table__item">{priceMaterial}</div>
      <div className="basket-table__item">{total}</div>
    </div>
  );
};
