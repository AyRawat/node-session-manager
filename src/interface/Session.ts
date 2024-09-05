import { userInterface } from './User';

export interface sessionInterface {
    id: number;
    session_key: string;
    user_agent: string;
    ip_address: string;
    is_active: boolean;
    created_at?: Date;
    user: userInterface;
    user_id: number;
}