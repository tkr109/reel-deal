const stripe = require("stripe")("sk_test_51NZsJHSFP0q9Yrdk9dNtFIFnhceN3IPBfpU617aKK8ukdzZ1jUx3HL3otBY0rXwy00IAom16A8FRlZ9z8weNSdnV00BWIhfPec");

const handlePayment = async (req, res) => {
    const product = req.body.products; // Assuming the product is nested under the 'products' key

    const lineItems = [{
        price_data: {
            currency: "inr",
            product_data: {
                name: product.title,
                images: [product.poster_path],
            },
            unit_amount: product.price * 100, // Adjust this according to your needs
        },
        quantity: 1, // Assuming you want to purchase one item, adjust as needed
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
