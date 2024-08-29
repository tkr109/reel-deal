const dotenv=require('dotenv')
const stripe = require("stripe")(process.env.STRIPE_KEY);

const handlePayment = async (req, res) => {
    const product = req.body.products; 

    const lineItems = [{
        price_data: {
            currency: "inr",
            product_data: {
                name: product.title,
                images: [product.poster_path],
            },
            unit_amount: product.price * 100, 
        },
        quantity: 1, 
    }];

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:5173/success",
        cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ id: session.id });
};

module.exports = {
    handlePayment,
};
