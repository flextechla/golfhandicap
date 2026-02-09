export interface Profile {
  id: string;
  display_name: string | null;
  handicap_index: number | null;
  is_super_admin: boolean;
  group_id: string | null;
  current_group_id: string | null;
}

export interface Round {
  id: string;
  user_id: string | null;
  course_name: string | null;
  score: number;
  course_rating: number | null;
  slope_rating: number | null;
  differential: number | null;
  date_played: string;
  created_at: string | null;
}

export interface Course {
  id: string;
  name: string;
  city: string | null;
  tee: string | null;
  course_rating: number | null;
  slope_rating: number | null;
  created_by: string | null;
  group_id: string | null;
}

export interface Group {
  id: string;
  name: string;
  group_code: string;
  owner_id: string;
  created_at: string | null;
}

export interface GroupMember {
  id: string;
  group_id: string;
  user_id: string;
  created_at: string | null;
}

export type AuthMode = "signin" | "signup" | "recovery";