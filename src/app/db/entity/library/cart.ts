import {
    Sequelize,
    DataTypes,
    IntegerDataType,
    Model
} from 'sequelize';

export class Cart extends Model {
    email?: string;
    productid?: number;
    totalprice?: number;
}

export default (sequelize: Sequelize): typeof Cart => {
    Cart.init({
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        productid: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        totalprice: {
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