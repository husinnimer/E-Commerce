// import { useAppSelector } from "@store/hook";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const { container, totalNum, pumpAnimate, iconWrapper } = styles;

type HeaderCounterProps = {
  page: string;
  totalQuantity: number;
  svgIcon: React.ReactNode;
  title: string;
};

const HeaderCounter = ({
  totalQuantity,
  svgIcon,
  page,
  title,
}: HeaderCounterProps) => {
  const [isAnimate, setIsAnimate] = useState(false);
  const navigate = useNavigate();

  const quantityStyle = `${totalNum} ${isAnimate ? pumpAnimate : ""}`;

  useEffect(() => {
    if (!totalQuantity) {
      return;
    }

    setIsAnimate(true);

    const deboundce = setTimeout(() => {
      setIsAnimate(false);
    }, 300);

    return () => clearTimeout(deboundce);
  }, [totalQuantity]);

  return (
    <div className={container} onClick={() => navigate(page)}>
      <div className={iconWrapper}>
        {svgIcon}
        {totalQuantity > 0 && (
          <div className={quantityStyle}>{totalQuantity}</div>
        )}
      </div>
      <h3>{title}</h3>
    </div>
  );
};

export default HeaderCounter;
