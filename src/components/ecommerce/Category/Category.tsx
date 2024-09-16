import { Link } from "react-router-dom";
import styles from "./style.module.css";
import { TCategories } from "src/types/categories";
const { category, categoryImg, categoryTitle } = styles;

const Category = ({ title, img, prefix }: TCategories) => {
  return (
    <div className={category}>
      <Link to={`/categories/product/${prefix}`}>
        <div className={categoryImg}>
          <img src={img} alt={title} />
        </div>
        <h4 className={categoryTitle}>{title}</h4>
      </Link>
    </div>
  );
};

export default Category;
