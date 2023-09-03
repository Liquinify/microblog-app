import { useState } from "react";
import { useQuery } from "react-query";
import { getCurrentUser } from "../utils/api.config";
import { Users } from "../models/users";

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<Users[]>([]);
  const { data, isLoading, isError } = useQuery("currentUser", getCurrentUser);

  const handleRefreshCurrentUser = async () => {
    setCurrentUser(data);
    await getCurrentUser();
  };

  return {
    data,
    currentUser,
    isLoading,
    isError,
    handleRefreshCurrentUser,
  };
};
