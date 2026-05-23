import { create } from "node:domain";

const status = ["open", "in_progress", "resolved"] as const;
const ISSUE_TYPE = ["bug", "feature_request"] as const;


export type Status = typeof status[number];
export type TypeOfIssue = typeof ISSUE_TYPE[number];


export type Issue = {
    id: number;
    title: string;
    description: string;
    type: TypeOfIssue;
    status: Status;
    reporter_id: number;
    created_at: Date;
    updated_at: Date
}

export type CreateIssuePayload = Pick<Issue, "title" | "description" | "type">;

export type UpadteIssuePayload = Partial<CreateIssuePayload>;


export const ISSUE_MODE = {
    create:"create",
    update:"update" 
} as const;

export type IssueMode = typeof ISSUE_MODE[keyof typeof ISSUE_MODE];