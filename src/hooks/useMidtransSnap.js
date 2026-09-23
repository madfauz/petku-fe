import { useState, useEffect, useCallback } from "react";

const SNAP_SCRIPT_URL = "https://app.sandbox.midtrans.com/snap/snap.js";
const CLIENT_KEY = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

export const useMidtransSnap = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let scriptTag = document.querySelector(`script[src="${SNAP_SCRIPT_URL}"]`);

    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.src = SNAP_SCRIPT_URL;
      scriptTag.setAttribute("data-client-key", CLIENT_KEY);
      scriptTag.async = true;

      scriptTag.onload = () => {
        setIsLoaded(true);
      };

      scriptTag.onerror = () => {
        console.error("Gagal memuat SDK Midtrans Snap.");
        setIsLoaded(false);
      };

      document.body.appendChild(scriptTag);
    } else {
      setIsLoaded(true);
    }
  }, []);

  const snapPay = useCallback((token, callbacks = {}) => {
    if (!window.snap) {
      console.error("Midtrans Snap belum siap atau gagal dimuat.");
      return;
    }

    window.snap.pay(token, {
      onSuccess: (result) => callbacks.onSuccess && callbacks.onSuccess(result),
      onPending: (result) => callbacks.onPending && callbacks.onPending(result),
      onError: (result) => callbacks.onError && callbacks.onError(result),
      onClose: () => callbacks.onClose && callbacks.onClose(),
    });
  }, []);

  return { isLoaded, snapPay };
};
