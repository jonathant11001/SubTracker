import { useState, useEffect } from "react";

const Calendar = ({ subscriptions }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const calendarDays = [];
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(null);
    }
    for (let i = 1; i <= days; i++) {
      calendarDays.push(new Date(year, month, i));
    }
    setDaysInMonth(calendarDays);
  }, [currentDate]);

  const getSubscriptionsForDate = (date) => {
    return subscriptions.filter((sub) => {
      const renewalDate = new Date(sub.renewalDate);
      const previousRenewalDate = new Date(sub.previousRenewalDate);
      return (
        (renewalDate.getFullYear() === date.getFullYear() &&
          renewalDate.getMonth() === date.getMonth() &&
          renewalDate.getDate() === date.getDate()) ||
        (previousRenewalDate.getFullYear() === date.getFullYear() &&
          previousRenewalDate.getMonth() === date.getMonth() &&
          previousRenewalDate.getDate() === date.getDate())
      );
    });
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className="calendar">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="bg-blue-500 text-white px-2 py-1 rounded">
          Prev
        </button>
        <h2 className="text-lg font-bold">
          {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
        </h2>
        <button onClick={handleNextMonth} className="bg-blue-500 text-white px-2 py-1 rounded">
          Next
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-bold text-center">
            {day}
          </div>
        ))}
        {daysInMonth.map((date, index) => (
          <div
            key={index}
            className={`p-2 border rounded ${
              date && getSubscriptionsForDate(date).length > 0 ? "bg-yellow-200" : "bg-gray-100"
            }`}
          >
            {date ? (
              <>
                <span className="block text-center text-black">{date.getDate()}</span> 
                {getSubscriptionsForDate(date).map((sub, idx) => {
                  const isRenewalDate =
                    new Date(sub.renewalDate).toDateString() === date.toDateString();
                  return (
                    <div key={idx} className="text-xs text-center">
                      <span
                        className={`block ${
                          isRenewalDate ? "text-red-500" : "text-gray-500 line-through"
                        }`}
                      >
                        {sub.name}
                      </span>
                    </div>
                  );
                })}
              </>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;