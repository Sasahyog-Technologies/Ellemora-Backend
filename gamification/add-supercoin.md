// add supercoin

body : amount , userId

[validation]

- amount should be valid
- user have supercoin account / otherwise create supercoin account

transection / supercoin : +value / supercoin / order : orderId

supercoin / balance : +amount

[response]
{
statusCode : 200,
"status": "success",
"message": "Supercoin Added Successfully"
}
