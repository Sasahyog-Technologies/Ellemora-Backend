// Redeem Giftcard;

body : giftcard Identifier/ Code , userId

[validation]

- giftcard should be valid
- giftcard should not be redeemed
- user have wallet account / otherwise create wallet account

transection / giftcard : -1000
giftcard / status : redeemed

transection / wallet : +1000
wallet / balance : +1000

[response]
{
statusCode : 200,
"status": "success",
"message": "Giftcard Redeemed Successfully"
}
