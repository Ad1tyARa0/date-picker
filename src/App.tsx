import './App.scss'
import { DateRangePicker } from './components/date-range-picker/DateRangePicker';
import './sass/globals.scss';

function App() {

  const handleChangeDates = (payload: Array<Array<Date>>) => {
    console.log(payload);
  }

  const PREDEFINED_RANGES = [
    {
      title: 'Today',
      value: 0,
      id: 0
    },

    {
      title: 'Yesterday',
      value: 1,
      id: 1,
    },

    {
      title: 'Last 7 Days',
      value: 7,
      id: 2,
    },

    {
      title: 'Last 30 Days',
      value: 30,
      id: 3,
    },
  ]

  return (
    <div className='app'>
      <DateRangePicker handleChange={handleChangeDates} predefinedRanges={PREDEFINED_RANGES} />
    </div>
  )
}

export default App
