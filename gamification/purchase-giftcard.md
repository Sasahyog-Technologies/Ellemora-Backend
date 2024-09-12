// Purchase Giftcard

body : amount , templateId , userId

[validation]

- amount should be valid
- templateId should be valid

transection / giftcard : +value / -amount / giftcard
giftcard / balance : amount / template : templateId / createdByUser : userId / code : (auto generated)

send alert to user;

[response]
{
statusCode : 200,
"status": "success",
"message": "Giftcard Purchased Successfully"
details : {
"giftcardId" : "123456",
"amount" : "1000",
"templateId" : "1",
"userId" : "123"
}
