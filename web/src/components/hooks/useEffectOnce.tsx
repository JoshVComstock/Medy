import { AnyFunction } from "@/types/interfaces/AnyFunction";
import { useEffect, useRef } from "react";

export const useEffectOnce = (callback: AnyFunction, array: any[]) => {
  const counter = useRef(0);
  useEffect(() => {
    if (counter.current > 1) {
      counter.current = 0;
    }
  }, array);
  useEffect(() => {
    if (counter.current === 0) {
      callback();
    }
    counter.current++;
  }, array);
};
