import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setSmsButtonCooling } from "../../../../../features/user/userSlice";

const SmsButtonText: React.FC = () => {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState<number>(60);

  useEffect(() => {
    let cooling: any = setInterval(() => {
      setCurrent((current) => current - 1);
    }, 1000);
    return () => clearInterval(cooling);
  }, []);

  if (current === 0) {
    dispatch(setSmsButtonCooling(false));
  }

  return <span>{current} 秒后重新发送</span>;
};
export default SmsButtonText;
