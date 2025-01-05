import { CalendarDate } from "@internationalized/date";

export const formatDate = (dateValue: CalendarDate): string => {
  const now =  new Date();
  // const mappedDateValue = new Date(dateValue.toDate('UTC')).getTime()
  const { day, month } = dateValue;
  // console.log(`${day} ${now.getDate()} ${month} ${now.getMonth()}`)
  //AUJOURDHUI
  if (month === now.getMonth() + 1 && day === now.getDate()) {
    return "Aujourd'hui"
  }

  //DEMAIN DU MEME MOIS
  if (month === now.getMonth() + 1 && day === now.getDate() + 1) {
    return 'Demain'
  }

  //DEMAIN SI MOIS DIFFERENT
  if (month === now.getMonth() + 2) {
    const nowTS = now.getTime();
    const nowDV = dateValue.toDate('UTC').getTime()
    const diff = nowDV - nowTS;
    if (diff < 24 * 60 * 60 * 1000) {
      return 'Demain'
    }
  }
  return dateValue.toDate('UTC').toLocaleDateString()
}