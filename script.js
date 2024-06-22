
const monthData = document.getElementsByClassName("month-column")
const calenderBody = document.getElementById("calenderDays")
const monthName = document.getElementById('monthName')
const buttonLeft = document.getElementById('buttonLeft')
const buttonRight = document.getElementById('buttonRight')


const date = new Date()

const monthObj = {
    0 : 'January' ,
    1 : 'February' ,
    2 : 'March' ,
    3 : 'April' ,
    4 : 'May' ,
    5 : 'June' ,
    6 : 'July' ,
    7 : 'August' ,
    8 : 'September' ,
    9 : 'October' ,
    10 : 'November' ,
    11 : 'December' ,
}

let monthInNumber = date.getMonth()
let currentMonth = monthObj[date.getMonth()] 
let currentYear = date.getFullYear()
let yearToShow = currentYear
let monthToShow = monthInNumber
const daysInMonth = (year , month) => {
    return new Date(year , month , 0).getDate()
}

const setCurrentMonth = () => {
    monthName.innerText=`${currentMonth} ${currentYear}`
}

Array.prototype.count = function (item){
    let result = {
        index : [],
        count : 0
    }
    result.count = this.filter(
        (data , index)=>{
            if(data===item){
                result.index.push(index)
                return data
            }
        }
    ).length
    return result
}
const setDatesInMonth = (year = new Date().getFullYear() , month =  new Date().getMonth() ) => {
    calenderBody.innerHTML=''
    const days = daysInMonth(year , month)
    let daysArray = [...Array((new Date(`${month+1}-01-${year}`).getDay())).keys()].map(i=>days-i).reverse()
    daysArray.push(... [...Array(days).keys()].map(i=>i+1))
    if((daysArray.length%7)!==0){
        daysArray.push(... [...Array(7-(daysArray.length%7)).keys()].map(i=>i+1))
    }

    daysArray=daysArray.reverse()
    daysArray.forEach((day,index)=>{
        let monthVal = month
        let countResult = daysArray.count(day)
        if (day>15 && countResult.count>1 && countResult.index[0] === index) {
            monthVal = month+1
        }
        if (day<15 && countResult.count>1 && countResult.index[1] === index) {
            monthVal = month-1
        }
        document.querySelector('#calenderDays').insertAdjacentHTML(
            'afterbegin',
            `<div class="calender-day">
                <div 
                    class="day-number 
                            ${day>15 && countResult.count>1 && countResult.index[1] === index ? 'day-other-month':''}
                            ${day<15 && countResult.count>1 && countResult.index[0] === index ? 'day-other-month':''}"
                    id="${day+'-'+monthVal+'-'+year}"
                >
                    ${day}
                </div>
            </div>` 
        )
    })
    setCurrentDate()
}

const setCurrentDate = () =>{
   let dates = document.querySelectorAll('.day-number')

   dates.forEach(day=>{
    if (day.id === date.getDate()+'-'+monthInNumber+'-'+currentYear) {
        day.classList.add('today')
    }
   })
}

const setMonthData = (year = currentYear , month = currentMonth) => {
    monthName.innerText=`${month} ${year}`
}

const navigateRight  = () =>{
    if(monthToShow===11){
        monthToShow = 0
        yearToShow++
    }else{
        monthToShow++
    }

    setMonthData(yearToShow , monthObj[monthToShow])
    setDatesInMonth(yearToShow , monthToShow)
}

const navigateLeft = () => {
    if(monthToShow===0){
        monthToShow = 11
        yearToShow--
    }else{
        monthToShow--
    }

    setMonthData(yearToShow , monthObj[monthToShow])
    setDatesInMonth(yearToShow , monthToShow)
}

buttonLeft.addEventListener('click' , navigateLeft)
buttonRight.addEventListener('click' , navigateRight)

setCurrentMonth()
setDatesInMonth()
setCurrentDate()



