import {
    Sequelize,
    DataTypes,
    IntegerDataType,
    Model
} from 'sequelize';

export class User extends Model {
    name?: string;
    email?: string;
    phone_no?: number;
    address?: string;
    password?: string;
    static associate = models => {
        User.belongsTo(models.Order, {
            foreignKey: 'id',
            onDelete: 'CASCADE'
        })
    }
}
export default (sequelize: Sequelize): typeof User => {
    User.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone_no: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address:{
            type:DataTypes.STRING
        }
    },
        {
            underscored: true,
            tableName: 'users',
            sequelize
        })
    return User
};