import { useStateContext } from "@/context/contextProvider";
import { FC } from "react";

const useWithAuth = <P extends object>(WrappedComponent: FC<P>): FC<P> => {
  return (props: P) => {
    const { profile } = useStateContext();
    
    if (profile?.email) {
      return <WrappedComponent {...props} />;
    }
    
    return null; 
  };
};

export default useWithAuth;