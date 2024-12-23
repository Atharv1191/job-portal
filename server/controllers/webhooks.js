const {  Webhook } = require('svix')

const User = require('../models/User');

//API controller function to manage clerk with database

const clerkWebhooks = async (req, res) => {
try {
    //CREATE a svix instance with clerk webhook secret
    const whook = new Webhook (process.env.CLERK_WEBHOOK_SECRET);

    //verify Headers
    await whook.verify(JSON.stringify(req.body),{
        'svix-id': req.headers['svix-id'],
        'svix-signature': req.headers['svix-signature'],
        'svix-timestamp': req.headers['svix-timestamp']
    })
    //Getting data from request body
    const { data,type } = req.body;
    //Switch case for diffrent enents
    switch (type) {
        case 'user.created':{
            const userData ={
                _id: data.id,
                email: data.email_addresses[0].email_address,
                name:data.first_name + ' ' + data.last_name,
                image: data.image_url,
                resume:''

            }
            await User.create(userData);
            return res.status(200).json({});
            break;

        }
        case 'user.updated':{
            const userData ={
               
                email: data.email_addresses[0].email_address,
                name:data.first_name + ' ' + data.last_name,
                image: data.image_url,
               

            }
            await User.findByIdAndUpdate(data.id.userData);
            res.json({})
            break;
        }
        case 'user.deleted':{
            await User.findByIdAndDelete(data.id);
            res.json({})
            break;
            
        }
        default:
            break;
    }
} catch (error) {
    console.log(error);
    return res.status(400).json({
        success: false,
        message: error.message
    })
    
}
}
module.exports = {clerkWebhooks}