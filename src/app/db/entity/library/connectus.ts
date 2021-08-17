import {
    Sequelize,
    DataTypes,
    IntegerDataType,
    Model
} from 'sequelize';

export class Connect extends Model {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

export default (sequelize: Sequelize): typeof Connect => {
    Connect.init({
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: true
        },
        message: {
            type: DataTypes.STRING,
            allowNull: true
        },
    },
        {
            underscored: true,
            tableName: 'connects',
            sequelize
        })

    return Connect
};