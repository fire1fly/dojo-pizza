import React from 'react';
import PropTypes from 'prop-types';

const Categories = React.memo(function Categories({activeCategory, categories, onClickCat}) {

  console.log("CAT RERENDER");

  return (
    <div className="categories">
      <ul>
        <li
          onClick={() => onClickCat(null)}
          className={activeCategory === null ? 'active' : null}
        >
          Все
        </li>
        {
          Array.isArray(categories) && categories.map((categoryName, index) => 
            <li
              key={`${categoryName}_${index}`}
              onClick={() => onClickCat(index)}
              className={activeCategory === index ? 'active' : null}
            >
              {categoryName}
            </li>
          )
        }

      </ul>
    </div>
  );
});

Categories.propTypes = {
  // activeCategory: PropTypes.oneOfType([PropTypes.number, null]),
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickCat: PropTypes.func.isRequired
}

Categories.defaultProps = {
  activeCategory: null,
  categories: []
};

export default Categories;