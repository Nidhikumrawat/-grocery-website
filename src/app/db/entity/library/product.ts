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
    image_url?: string;
    product_unit?: string
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
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        product_unit: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'unit'
        }
    },
        {
            underscored: true,
            tableName: 'products',
            sequelize
        })

    return Product
};