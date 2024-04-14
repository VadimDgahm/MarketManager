import { useNavigate } from "react-router-dom";

import { LoginForm } from "@/components/auth/sign-in";
// import { SingUpForm } from "@/components/auth/sign-up";
import {
  useLoginMutation,
  useLogoutMutation,
  // useRegistrationMutation,
} from "@/services/auth/auth.services";
import { LoginData } from "@/services/auth/authServicesType";

export const Login = () => {
  const [login] = useLoginMutation();
  // const [registration] = useRegistrationMutation();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const onSubmitLogin = async ({ email, password }: LoginData) => {
    try {
      const res = await login({ email, password });
      // @ts-ignore
      if (res.data) {
        navigate("/");
      }
    } catch (e) {
      // @ts-ignore
      console.log(e.response.data?.message);
    }
  };

  const onSubmitLOGOUT = async () => {
    try {
      await logout();
    } catch (e) {
      // @ts-ignore
      console.log(e.response.data?.message);
    }
  };

  return (
    <div>
      <button onClick={onSubmitLOGOUT}>LOGOUT</button>
      <LoginForm onSubmit={onSubmitLogin} />
    </div>
  );
};
