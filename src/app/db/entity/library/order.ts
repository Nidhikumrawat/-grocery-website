import {
    Sequelize,
    DataTypes,
    IntegerDataType,
    Model
} from 'sequelize';

export class Order extends Model {
    user_id?: number;
    order_id?: string;
    status?: string;
    total_order_amount?: number;

}

export default (sequelize: Sequelize): typeof Order => {
    Order.init({
        order_id: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        user_id: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: "Pending"
        },
        total_order_amount: {
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