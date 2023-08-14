import { useEffect, useRef, useState } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(
    function () {
      function handleClick(e) {
        if (isRequesting) {
          return; // Don't handle the click if a request is in progress
        }

        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () => document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing, isRequesting]
  );

  return { ref, setIsRequesting };
}
