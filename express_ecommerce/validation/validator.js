const {check, validationResult}=require('express-validator')

// category valiation
exports.categoryValidation=[
    check('category_name','Category is mandatory').notEmpty()
    .isLength({min:3}).withMessage('Category name must be more than 3 characters')

]

// product validation
exports.productValidation=[
    check('product_name','product name is mandatory').notEmpty()
    .isLength({min:3}).withMessage('product name is must be more than 3 character'),

    check('product_price','product price is mandatory').notEmpty()
    .isNumeric().withMessage('product price is must be numeric value only'),

    check('countInStock','count In  Stock is mandatory').notEmpty()
    .isNumeric().withMessage('count in stock must be numeric value only'),

    check('product_description','product description is mandatory').notEmpty()
    .isLength({min:20}).withMessage('product description is must be at least 20 character'),

    check('category','category is mandatory').notEmpty()
]

exports.validation=(req,res,next)=>{
    const errors=validationResult(req)
    if(errors.isEmpty()){
        next()
    }
    else{
        return res.status(400).json({error:errors.array()[0].msg})
    }
}