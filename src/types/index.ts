
// for user

const role = ["contributor", "maintainer"] as const;

export type Role = typeof role[number];

export type User = {
    id: number;
    name: string;
    email: string;
    password: s;
    role: Role;
    created_at: Date;
    updated_at: Date
}

export type RUser = Omit<User, "password">;

// for issues

const status = ["open", "in_progress", "resolved"] as const;
const type = ["bug", "feature_request"];


export type Status = typeof status[number];
export type IssueType = typeof type[number];



export type Issues = {
    id: number;
    title: string;
    description: string;
    type: IssueType;
    status: Status;
    reporter_id: number;
    created_at: Date;
    updated_at: Date
}
