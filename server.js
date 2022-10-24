//payment - Card number 42424242424242424242...
//date 12/34 - CVV 123

const express = require('express');
var cors = require('cors'); 
const stripe = require('stripe')("YOUR API KEY HERE");

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

//1. Send a post request to the "/checkout" route
//the path is "/checkout"
app.post("/checkout", async(req, res) => {

    console.log(req.body); //just to make sure the backend works
    /*
    On the react side, we will pass in some data to the actual request "req"
    req.body.items = an array which looks like this
    [ {id: 1, quantity: 1} ]
    however, what stripe wants is something like this
    [ {price: 1, quantity: 1} ]
    Instead of id it wants the field to say "price"
    This is easy enough to execute. We can simply transform the data that comes in from the react side
    This items array is called "lineItems" by stripe for their API call
    */
    //2. Take the posted data from the user/react sent "req" and reformat to stripe friendly format
    const items = req.body.items;
    let lineItems = [];
    items.forEach(item => {
        lineItems.push({
            price: item.id,
            quantity: item.quantity
        })
    });

    //3. Create a payment session using the lineItems
    // Since this is async, the function will wait for Stripe to fully create the checkout session
    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
    })

    //4. Once the session is created, send the session url to the front end
    //now we have a url that the user can use to checkout
    res.send(JSON.stringify({
        url: session.url
    }));    //this response will be sent to react and will allow us to show the user the stripe checkout page

});

//express backend will live on port 4000 
app.listen(4000, () => console.log("listening on port 4000"))