//Just a tipical button component.
const Button = ({color, text, onClick}) => {
    return (
      <button className='btn'
      type= "submit"
      onClick={onClick}
      style={{background:color}}
      >{text}</button>
    )
  }
  
  export default Button;
  