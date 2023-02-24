import { AuthServices } from './auth-services';
import { ImageServices } from './image-services';


export class ApiServices {

    auth = new AuthServices();
    imageServices = new ImageServices();
}
