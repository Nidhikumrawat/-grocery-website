import {
    Sequelize,
    DataTypes,
    IntegerDataType,
    Model
} from 'sequelize';

export class Product extends Model {
    name?: string;
    description?: string;
    price?: number;
   
}

export default (sequelize: Sequelize): typeof Product => {
    Product.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.NUMBER,
            allowNull: false
        }
    },
        {
            underscored: true,
            tableName: 'products',
            sequelize
        })

    return Product
};