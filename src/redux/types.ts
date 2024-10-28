export interface Campaign {
  creator: string; // Equivalent to `AccountId` in Rust
  total_contributions: number; // Equivalent to `u64`
  contributions: Contribution[]; // Equivalent to `Vec<Contribution>`
  crowdfunding_end_time: number; // Equivalent to `U64`
  claimed: boolean;
  amount_required: number; // Equivalent to `u64`
  title: string;
  description: string;
  images: string;
  campaign_code: string;
}

export interface Contribution {
  contributor: string;
  amount: number;
}

export interface BuildAccount {
  id_hash: string;
  creator: string;
  creator_id?: string | null;
  status: BountyStatus;
  idx: number;
  starting_date: string;
  build_rules: string;
  build_type: BountyType;
  milestone: string;
  guild: Guild[];
  guild_points?: Array<[string, bigint]> | null;
  messages?: Chat[] | null;
  user: string[];
  winners: string[];
  entry_prize: number;
  total_prize: bigint;
  no_of_winners: number;
  no_of_participants: bigint;
  milestone_type: MilestonesType;
  end_date: string;
  title: string;
  points?: Array<[string, bigint]> | null;
  milestones?: MilestonesAccount[] | null;
}

export interface BugAccount {
  id_hash: string;
  creator: string;
  creator_id?: string | null;
  status: BountyStatus;
  idx: number;
  starting_date: string;
  bug_rules: string;
  bug_type: BountyType;
  milestone: string;
  guild: Guild[];
  guild_points?: Array<[string, bigint]> | null;
  messages?: Chat[] | null;
  user: string[];
  winners: string[];
  entry_prize: number;
  total_prize: bigint;
  no_of_winners: number;
  no_of_participants: bigint;
  milestone_type: MilestonesType;
  end_date: string;
  title: string;
  points?: Array<[string, bigint]> | null;
  milestones?: MilestonesAccount[] | null;
}

export interface MilestonesAccount {
  status: BountyStatus;
  milestone_status: MilestonesStatus;
  idx: number;
  starting_date?: string | null;
  milestone_rules: string;
  bounty_type: BountyType;
  milestone: string;
  guilds: Guild[];
  messages?: Chat[] | null;
  participants: string[];
  winners: string[];
  no_of_winners?: number | null;
  no_of_participants: bigint;
  milestone_type: MilestonesType;
  name?: string | null;
}

export interface Guild {
  id_hash: string;
  captain: string;
  status: GuildType;
  name: string;
  tag: string;
  members: Member[];
  requests: string[];
  points?: bigint | null;
}

export interface Member {
  name: string;
  principal_id: string;
}

export interface Chat {
  name: string;
  id: string;
  time: string;
  message: string;
}
export enum MilestonesType {
  TeamvTeam = "TeamvTeam",
  Single = "Single",
  Duo = "Duo",
  Guild = "Guild",
}

export enum BountyStatus {
  AcceptingHunters = "AcceptingHunters",
  BountyHuntingInProgress = "BountyHuntingInProgress",
  BountyHuntingCompleted = "BountyHuntingCompleted",
  Archived = "Archived",
}

export enum MilestonesStatus {
  ReadyToStart = "ReadyToStart",
  MilestonesInProgress = "MilestonesInProgress",
  MilestonesCompleted = "MilestonesCompleted",
}

export enum BountyType {
  OpenSource = "OpenSource",
  Reproduced = "Reproduced",
}

export enum GuildType {
  Open = "Open",
  Closed = "Closed",
}

export enum Status {
  Online = "Online",
  Offline = "Offline",
}

export interface TokenState {
  bump: number;
  amount: bigint;
}

export interface User {
  username: string;
  bio: string | null;
  kyc_verified: boolean;
  contributions: number[];
  created_campaigns: number[];
}
