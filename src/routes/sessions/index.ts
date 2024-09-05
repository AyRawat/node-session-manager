import { RouteInterface } from "../";
import { SessionController } from "../../controller/SessionController";

interface SessionRouteInterface extends RouteInterface {
    controller: typeof SessionController
}

export const SessionRoutes: SessionRouteInterface[] = [
    {
        method: 'post',
        route: '/session',
        controller: SessionController,
        action: 'save'
    }
]