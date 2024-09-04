import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import pageRoutes from "@/utils/pageRoutes";
import { toast } from "react-hot-toast";

const login_state = {
  email: "",
  password: "",
};

const signup_state = {
  employee_name: "",
  phone: "",
  email: "",
  password: "",
};

const useAuthHooks = () => {
  const [login, setlogin] = useState(login_state);
  const [signup, setSignUp] = useState(signup_state);
  const router = useRouter();

  const successmsg = () => {
    toast.success("Signing in!");
  };

  const errmessage = () => {
    toast.error("Invalid Username or password");
  };

  const successmsg2 = () => {
    toast.success("User created successfully!");
  };

  const errormsg2 = () => {
    toast.error("User already available!");
  };

  const handlesignupChange = (e) => {
    setSignUp({ ...signup, [e.target.name]: e.target.value });
  };

  const handlesignupsubmit = async(e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/user", signup);
      setSignUp(signup_state);
      setTimeout(() => router.push(pageRoutes.LOGIN()), 1000);
      successmsg2();
    } catch (error) {
      errormsg2();
    }
  };

  const handleloginChange = (e) => {
    setlogin({ ...login, [e.target.name]: e.target.value });
  };
  const handleloginsubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/userLogin",
        login
      );
      if (response.status === 200) {
        successmsg();
        setTimeout(() => router.push(pageRoutes.DASHBOARD()), 1000);
      }
    } catch (error) {
      errmessage();
      console.log(error);
    }
  };

  return {
    login,
    signup,
    handleloginChange,
    handlesignupChange,
    handleloginsubmit,
    handlesignupsubmit,
  };
};

export default useAuthHooks;
