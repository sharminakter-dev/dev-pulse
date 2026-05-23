import type { RUser } from "../modules/auth/auth.Interface";

declare global{
    namespace Express{
        interface Request{
            user?: RUser & {id: string};
        }
    }
}