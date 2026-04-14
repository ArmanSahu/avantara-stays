export const Button = ({children,className,size}) => {
  if(size === "sm"){
    return <button className={"py-2 px-3 md:py-2 md:px-3 md:text-sm text-xs text-White-100 bg-Green-600 font-medium rounded-md cursor-pointer"}>
      {children}
    </button>
  }else if(size === "md"){
    return <button className={"py-2 px-3 md:py-3 md:px-6 md:text-base text-sm text-White-100 bg-Green-600 font-medium rounded-lg cursor-pointer"}>
      {children}
    </button>
  }else if(size === "lg"){
    return <button className={"py-2 px-5 md:py-3 md:px-8 tracking-tight md:text-2xl text-base text-White-100 bg-Green-600 font-semibold md:rounded-xl rounded-lg cursor-pointer"}>
      {children}
    </button>
  }else{
    return <button className={className}>
      {children}
    </button>
  }
}