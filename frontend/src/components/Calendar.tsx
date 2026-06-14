import { useState } from 'react'

interface CalendarProps {
  selectedDate: string; // "YYYY-MM-DD" 형태의 선택된 날짜
  onSelectDate: (date: string) => void; // 날짜가 선택되었을 때 호출될 콜백 함수
}

function Calendar({ selectedDate, onSelectDate }: CalendarProps) {
  // 달력 내부에서 현재 탐색 중인 연도와 월을 관리하기 위한 Date 객체 상태
  const [currentDate, setCurrentDate] = useState<Date>(new Date(selectedDate))

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() // 0-indexed (0: 1월, 11: 12월)

  // 1. 특정 년/월의 시작 요일 및 총 일수를 기반으로 42칸의 달력 격자 배열을 생성하는 함수
  const generateCalendarDays = () => {
    // 이번 달 1일의 요일을 구합니다. (0: 일요일, 6: 토요일)
    const firstDayOfMonth = new Date(year, month, 1)
    const startDayOfWeek = firstDayOfMonth.getDay()

    // 이번 달의 마지막 날짜를 구합니다.
    // 0번째 날은 이전 달의 마지막 날이므로, month + 1의 0번째 날은 이번 달의 마지막 날이 됩니다.
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate()

    // 이전 달의 마지막 날짜를 구합니다.
    const prevMonthTotalDays = new Date(year, month, 0).getDate()

    const days: { dateStr: string; dayNum: number; isCurrentMonth: boolean }[] = []

    // 1) 이전 달의 빈 공간 채우기 (회색으로 표시할 영역)
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const dayNum = prevMonthTotalDays - i
      const prevMonth = month === 0 ? 11 : month - 1
      const prevYear = month === 0 ? year - 1 : year
      days.push({
        dateStr: `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`,
        dayNum: dayNum,
        isCurrentMonth: false,
      })
    }

    // 2) 이번 달의 날짜 채우기
    for (let dayNum = 1; dayNum <= totalDaysInMonth; dayNum++) {
      days.push({
        dateStr: `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`,
        dayNum: dayNum,
        isCurrentMonth: true,
      })
    }

    // 3) 다음 달의 빈 공간 채우기 (총 42칸이 되어 6줄 그리드가 일정하게 채워지도록 설정)
    const remainingCells = 42 - days.length
    for (let dayNum = 1; dayNum <= remainingCells; dayNum++) {
      const nextMonth = month === 11 ? 0 : month + 1
      const nextYear = month === 11 ? year + 1 : year
      days.push({
        dateStr: `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`,
        dayNum: dayNum,
        isCurrentMonth: false,
      })
    }

    return days
  }

  // 이전 달로 이동
  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  // 다음 달로 이동
  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const calendarDays = generateCalendarDays()
  const dayLabels = ['일', '월', '화', '수', '목', '금', '토']

  return (
    <div className="calendar-container">
      {/* 달력 헤더: 현재 연월 표시 및 이전/다음 버튼 */}
      <div className="calendar-header">
        <button type="button" onClick={handlePrevMonth} className="calendar-nav-btn">&lt;</button>
        <span className="calendar-title">{year}년 {month + 1}월</span>
        <button type="button" onClick={handleNextMonth} className="calendar-nav-btn">&gt;</button>
      </div>

      {/* 요일 라벨 헤더 */}
      <div className="calendar-day-labels">
        {dayLabels.map((label) => (
          <div key={label} className="calendar-day-label">{label}</div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="calendar-grid">
        {calendarDays.map((day) => {
          const isSelected = day.dateStr === selectedDate
          return (
            <button
              key={day.dateStr}
              type="button"
              onClick={() => onSelectDate(day.dateStr)}
              className={`calendar-day-cell ${day.isCurrentMonth ? 'current-month' : 'other-month'} ${isSelected ? 'selected' : ''}`}
            >
              <span className="day-number">{day.dayNum}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Calendar
