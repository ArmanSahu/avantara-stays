import { Link } from "react-router-dom"


export const LinkComp = ({variant,to,children,onClick,value,className}) => {
  const baseClass = `no-underline ${variant === "text"? "md:text-base text-sm text-Green-700 font-semibold":`md:w-24 md:h-9 w-20 h-8 md:text-base text-sm rounded-lg cursor-pointer ${value === "signup"?"bg-White-100 text-Green-700 border":"bg-Green-600 text-White-100"}`}`
  if(to){
    return <Link to={to} className={`${baseClass}${className}`} >{children}</Link>
    
  }else{
    return(<button onClick={onClick} className={baseClass}>
      {children}
    </button>)
  }
}