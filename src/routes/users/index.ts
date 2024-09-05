import { RouteInterface } from '../';
import { UserController } from '../../controller/UserController';
// upload file using multer like this
// import multer from 'multer';
// const fileUpload = multer();

interface UserRoutesInterface extends RouteInterface {
  controller: typeof UserController;
}

export const UserRoutes: UserRoutesInterface[] = [
  {
    method: 'get',
    route: '/users',
    controller: UserController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/users/:id',
    controller: UserController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/createUser',
    controller: UserController,
    action: 'save',
  },

];
