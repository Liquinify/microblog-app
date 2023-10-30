import { Database as DB } from "@/lib/database.types";

type Posts = DB["public"]["Tables"]["posts"]["Row"];
type Profile = DB["public"]["Tables"]["profiles"]["Row"];
type Comments = DB["public"]["Tables"]["comments"]["Row"];

declare global {
  type Database = DB;
  type PostsWithUser = Posts & {
    user: {
      id: string;
    };
    profiles: {
      avatar_url: string;
      username: string;
    };
    likes: number;
    user_has_liked_post: boolean;
  };
  type CommentsWithUser = Comments & {
    profiles: {
      avatar_url: string;
      username: string;
    };
  };
}
