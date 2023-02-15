import "./button.styles.scss"

export const BUTTON_TYPE_CLASSES = {
   google: 'google-sign-in',
   inverted: 'inverted'
};


const Button = ({ children, buttontype, ...otherprops }) => {
   return (

      <button {...otherprops} className={` button-container ${BUTTON_TYPE_CLASSES[buttontype]}`}>{children}</button>

   )
}

export default Button;

