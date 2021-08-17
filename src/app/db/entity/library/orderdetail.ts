import {
    Sequelize,
    DataTypes,
    IntegerDataType,
    Model
} from 'sequelize';

export class Orderdetail extends Model {
    name? : string;
    email?:string;
    phoneno?: number;
    productname?:string;
    description?: string;
    totalprice?:number;
    orderid?:string;
    address?: string;
    status?:string;
    price?:string;

}

export default (sequelize: Sequelize): typeof Orderdetail => {
    Orderdetail.init({
        name: {
            type: DataTypes.STRING
        },
       email: {
           type: DataTypes.STRING
       },
       phoneno: {
        type: DataTypes.NUMBER
      },
       productname: {
           type: DataTypes.STRING
       },
       description: {
        type: DataTypes.STRING
       },
        totalprice: {
            type: DataTypes.NUMBER,
        },
        price: {
            type: DataTypes.NUMBER,
        },
        quantity: {
            type: DataTypes.NUMBER,
        },
        orderid: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: "Pending"
        },
        address: {
            type: DataTypes.STRING
        }
    },
        {
            underscored: true,
            tableName: 'orderdetails',
            sequelize
        })
    return Orderdetail
};