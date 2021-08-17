import {
    Sequelize,
    DataTypes,
    IntegerDataType,
    Model
} from 'sequelize';

export class Order extends Model {
    email?: string;
    productid?:number;
    orderid?:string;
}

export default (sequelize: Sequelize): typeof Order => {
    Order.init({
        email: {
            type: DataTypes.STRING,
            allowNull: false
            },
        orderid: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        productid: {
            type: DataTypes.NUMBER,
            allowNull: false
          }
         
     },
        {
            underscored: true,
            tableName: 'orders',
            sequelize
        })

    return Order
};