import {orderedGoodHooks} from "./orderedGoodHooks";
import {OrderAdditionalInformationHooks} from "./OrderAdditionalInformationHooks";
import {ClientOrdersHooks} from "./ClientOrdersHooks";

export const sequelizeHooks = () => {
    orderedGoodHooks()
    OrderAdditionalInformationHooks()
    ClientOrdersHooks()
}
