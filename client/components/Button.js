const Button = ({color, text, onAdd}) => {
    return (
      <button class='btn'
      type= "submit"
      onClick={onAdd}
      style={{background:color}}
      >{text}</button>
    )
  }
  
  export default Button;
  