import { FC } from "react";
import style from "./card.module.css";

interface ICardModel {
  styleClass?: string;
  headerContext?: string;
  children?: React.ReactNode;
}

const Card: FC<ICardModel> = ({ styleClass, headerContext, children }) => {
  return (
    <div className={`${style.cardContainer} ${styleClass}`}>
      {headerContext && <h2 className={style.cardHeader}>{headerContext}</h2>}
      {children}
    </div>
  );
};

export default Card;
