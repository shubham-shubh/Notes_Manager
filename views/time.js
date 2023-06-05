module.exports = getDate;
function getDate()
{
   var today=new Date();
   var date=today.toDateString();
   return date;
}
