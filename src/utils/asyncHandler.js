export const asyncHandler = (func) => {
    
    return async function (req, res, next){

        try{

            await func(req, res, next);

        } catch(error){

            res.status(error.code || 500)
                .json({
                    success: false,
                    message: error.message
            });

        }
    }
}