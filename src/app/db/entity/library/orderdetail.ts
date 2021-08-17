import {
    Sequelize,
    DataTypes,
    IntegerDataType,
    Model
} from 'sequelize';

export class Orderdetail extends Model {
    order_id?: string;
    product_id?: number;
}

export default (sequelize: Sequelize): typeof Orderdetail => {
    Orderdetail.init({
        order_id: {
            type: DataTypes.STRING
        },
        product_id: {
            type: DataTypes.STRING
        }
    },
        {
            underscored: true,
            tableName: 'order_details',
            sequelize
        })
    return Orderdetail
};