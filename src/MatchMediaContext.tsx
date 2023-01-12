import { createContext } from "react";

import { ContextProps } from "./types";

const MatchMediaContext = createContext<ContextProps>({} as ContextProps);

export default MatchMediaContext;
