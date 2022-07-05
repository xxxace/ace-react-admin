import { createContext } from "react";

const KeepAliveContext = createContext<{ [key: string]: any }>({});

export default KeepAliveContext;