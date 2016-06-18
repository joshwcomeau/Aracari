import React, { PropTypes } from 'react';
import classNames from 'classnames';

const HeaderButton = ({ name, shown, action }) => {
  const buttonClasses = classNames(name, { shown });

  return (
    <button className={buttonClasses} onClick={action}>
      <i className="material-icons">{name}</i>
    </button>
  );
};

HeaderButton.propTypes = {
  name: PropTypes.string,
  shown: PropTypes.bool,
  action: PropTypes.func,
};

export default HeaderButton;
