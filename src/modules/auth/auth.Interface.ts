
export const USER_ROLE = {
    contributor:"contributor", 
    maintainer: "maintainer"
} as const;

export type Role = typeof USER_ROLE[keyof typeof USER_ROLE];

export interface IUser{
    id: number;
    name: string;
    email: string;
    password: string;
    role: Role;
    created_at: Date;
    updated_at: Date
}

export type RUser = Omit<IUser, "id"| "password">;