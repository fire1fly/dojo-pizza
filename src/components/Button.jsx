import React from 'react';
import classNames from 'classnames';

export default function Button({onClick, className, outline, disabled, children, onMouseEnter, onMouseLeave, isHover}) {

  return (
    <button onClick={onClick} 
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={classNames(
        'button', 
        className, 
        {'button--disabled': disabled},
        {'button--outline': outline}, 
        {'addWidthAddBtn': isHover === 1}, 
        {'lowWidthAddBtn': isHover === 2})
      }>

      {children}

    </button>
  );
}

