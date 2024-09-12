// Add topup wallet

body : amount , userId

[validation]

- amount should be valid
- user have wallet account / otherwise create wallet account

transection / wallet : -amount / +value / wallet
wallet / balance : +amount

[response]
{
statusCode : 200,
"status": "success",
"message": "Amount Added to Wallet Successfully"
}
