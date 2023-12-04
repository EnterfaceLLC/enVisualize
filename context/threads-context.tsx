import React, {
  createContext,
  PropsWithChildren,
  useState,
  useEffect,
} from "react";

import { Thread } from "../types/threads";

import { generateRandomThreads } from "../utils/DummyData";

export const ThreadsContext = createContext<Thread[]>([]);

export const ThreadsProvider = ({
  children,
}: PropsWithChildren): JSX.Element => {
  const [threads, setThreads] = useState<Thread[]>([]);

  useEffect(() => {
    setThreads(generateRandomThreads());
  }, []);

  return (
    <ThreadsContext.Provider value={threads}>
      {children}
    </ThreadsContext.Provider>
  );
};
