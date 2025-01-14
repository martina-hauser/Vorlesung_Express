import {orderStore} from '../services/orderStore.js'
import {SecurityUtil} from '../utils/security.js'

export class OrdersController {

    getOrders = async (req, res) => {
        res.json((await orderStore.all(SecurityUtil.currentUser(req)) || []))
    };

    createPizza = async (req, res) => {
        res.json(await orderStore.add(req.body.name, SecurityUtil.currentUser(req)));
    };

    showOrder = async (req, res) => {
        res.json(await orderStore.get(req.params.id, SecurityUtil.currentUser(req)));
    };

    deleteOrder = async (req, res) => {
        res.json(await orderStore.delete(req.params.id, SecurityUtil.currentUser(req)));
    };
}

export const ordersController = new OrdersController();
