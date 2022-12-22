import React from 'react';


const Button = (props: iButtonProps): React.ReactElement => {
  const buttonClasses = `px-6
    py-2.5
    text-white
    font-medium
    text-xs
    leading-tight
    uppercase
    rounded
    shadow-md
    transition
    duration-150
    ease-in-out
    active:shadow-lg
    focus:shadow-lg
    focus:outline-none
    focus:ring-0
    hover:shadow-lg
    ${props.customClasses}
  `;

  return (
    <button
      type="button"
      className={buttonClasses}
      data-bs-toggle="modal"
      data-bs-target="#addContactModal"
      onClick={props.handleOnClick}
    >
      {props.text}
    </button>
  )
}


Button.defaultProps = {
  text: 'Button',
  customClasses: '',
  handleOnClick: () => { },
}

interface iButtonProps {
  text?: string,
  customClasses?: string,
  handleOnClick?: () => void,
}

export default Button;
