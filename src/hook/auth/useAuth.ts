import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export const useAuth = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return {
    isAuthenticated: !!user,
    nickname: user?.nickname || null,
    email: user?.email || null,
  };
};
