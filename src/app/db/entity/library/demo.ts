import { string } from 'joi';
import {
    Sequelize,
    DataTypes,
    IntegerDataType,
    Model
} from 'sequelize';

export class Image extends Model {
    image?: BinaryType;
    imagedata?: string;
}

export default (sequelize: Sequelize): typeof Image => {
    Image.init({
    
        image: {
            type: DataTypes.BLOB,
            allowNull: false
        },
        imagedata:{
            type: DataTypes.STRING
        }
    },
        {
            underscored: true,
            tableName: 'images',
            sequelize
        })

    return Image
};