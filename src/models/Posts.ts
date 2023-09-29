export type Posts = {
  id: string;
  created_at: Date;
  post: string;
  username: string;
  user: {
    user_metadata: {
      username: string;
      userType: string;
    };
  };
};
