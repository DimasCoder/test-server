import { Roles } from "../enums/role.enum";

export interface UserPayload {
    email: string,
    role: Roles
}