/** Import Models */
import { productModel } from "../model.mjs"


/** Import Controllers */




/** ------------------------------- Product Controller Start  -------------------------------*/

/** list controller */
export const list = async (req, res) => {

    try {
        const data = productModel.find({}).exec()

        if (!data.length) {
            return res.status(404).json({
                message: 'No product found !'
            })
        }

        res.status(200).json({
            message: 'Product list get success.',
            data
        })

    } catch (error) {
        console.log('Error ===============>', error);
        return res.status(500).json({
            message: 'Server error !'
        })
    }

}
/** list end   */



/** create controller */
export const create = async (req, res) => {

    try {

        const {
            body: {
                name,
                image,
                decription,
                category,
            },
            cookies: { Token: { user } }
        } = req

        const sellerId = user._id
        const sellerName = user.fullName

        await productModel.create({
            name, image, decription, category, sellerId, sellerName
        }, { new: true }).exec()

        return res.status(200).json({
            message: 'Product create successfully.'
        })


    } catch (error) {
        console.log('Error ===============>', error);
        return res.status(500).json({
            message: 'Server error !'
        })
    }
}
/** create end   */













/** -----------------End------------------- */
