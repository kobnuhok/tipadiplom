import "./order.css";
import { Accordion } from "../accordion/accordion";

export const ItemOrder = ({ name, phone, order, status }) => {
  return (
    <div className="order">
      <div className="order__client">
        <div className="">{name}</div>
        <div className="">{phone}</div>
        <div className="">{status}</div>
      </div>
      <Accordion title="Подробнее о заказе" main>
        {JSON.parse(order).map((item, index) => (
          <div className="order__detailed" key={index}>
            <span>{item.nameJob}</span>
            <div className="order__info">
              {item.area && (
                <div className="order__item">
                  <span>Площадь</span>
                  <span>{item.area}</span>
                </div>
              )}
              {item.length && (
                <div className="order__item">
                  <span>Длина</span>
                  <span>{item.length}</span>
                </div>
              )}
              {item.width && (
                <div className="order__item">
                  <span>Ширина</span>
                  <span>{item.width}</span>
                </div>
              )}
              {item.thick && (
                <div className="order__item">
                  <span>Толщина</span>
                  <span>{item.thick}</span>
                </div>
              )}
              {item.material && (
                <div className="order__item">
                  <span>Материал</span>
                  <span>{item.material}</span>
                </div>
              )}
              {item.height && (
                <div className="order__item">
                  <span>Высота</span>
                  <span>{item.height}</span>
                </div>
              )}
              {item.square && (
                <div className="order__item">
                  <span>Площадь</span>
                  <span>{item.square}</span>
                </div>
              )}
              {item.think && (
                <div className="order__item">
                  <span>Толщина</span>
                  <span>{item.think}</span>
                </div>
              )}
              {item.layers && (
                <div className="order__item">
                  <span>Количество слоев</span>
                  <span>{item.layers}</span>
                </div>
              )}

              {item.priceMaterial && (
                <div className="order__item">
                  <span>Цена материала</span>
                  <span>{item.priceMaterial}</span>
                </div>
              )}
              {item.priceJob && (
                <div className="order__item">
                  <span>Цена работы</span>
                  <span>{item.priceJob}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </Accordion>
    </div>
  );
};
