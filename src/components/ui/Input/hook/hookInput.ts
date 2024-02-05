import { useEffect, useRef, useState } from "react";

export const useInput = (type: string | undefined) => {
  const [isOpenEye, setIsOpenEye] = useState<boolean | undefined>(undefined);
  const [typeInput, setTypeInput] = useState<string | undefined>("text");
  const rootInput = useRef(null);

  useEffect(() => {
    setTypeInput(type);
    if (type === "password") {
      setIsOpenEye(false);
    }
  }, [type]);

  const onClickSvgEye = (isOpen: boolean) => {
    isOpen ? setTypeInput("text") : setTypeInput("password");
    setIsOpenEye(isOpen);
  };

  return {
    isOpenEye,
    onClickSvgEye,
    rootInput,
    typeInput,
  };
};
