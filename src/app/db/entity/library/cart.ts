import {
    Sequelize,
    DataTypes,
    IntegerDataType,
    Model
} from 'sequelize';

export class Cart extends Model {
    user_id?: number;
    product_id?: number;
    quantity?: number;
}

export default (sequelize: Sequelize): typeof Cart => {
    Cart.init({
        user_id: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        product_id: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.NUMBER,
            allowNull: false
        }
    },
        {
            underscored: true,
            tableName: 'carts',
            sequelize
        })

    return Cart
};