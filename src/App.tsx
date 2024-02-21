import './App.scss'
import { DateRangePicker } from './components/date-range-picker/DateRangePicker';
import './sass/globals.scss';

function App() {

  const handleChangeDates = (payload: Array<Array<Date>>) => {
    console.log(payload);
  }

  return (
    <div className='app'>
      <DateRangePicker handleChange={handleChangeDates} />      
    </div>
  )
}

export default App
