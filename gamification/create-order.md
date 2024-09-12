// create order

body : userId, porducts : [{productId, quantity, price}], addressId,gateway, paymentMethods : [{
method : "wallet",
amount : -1000
},
{
id : 1
method : "supercoin",
amount : -100
},
{
method : "money",
amount : -1000
},
{
id : 1
method : "giftcard",
amount : -1000
},
{
id : 2
method : "coupon",
amount : -1000
}
{
id : 3
method : "wallet",
amount : +1000
}

]

[validation]

- userId should be valid
- products should be valid
- addressId should be valid
- gateway should be valid
- paymentMethods should be valid

orderGroup / id : (auto generated)

order / userId : userId / addressId : addressId / gateway : gateway / status : pending / orderGroup : orderGroup (etc)

transection / wallet / value -1000;
wallet / balance : -1000

transection / supercoin / value -100;
supercoin / balance : -100

transection / order / amount -1000;
