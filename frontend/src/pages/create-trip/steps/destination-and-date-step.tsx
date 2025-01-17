import { MapPin, Calendar, Settings2, ArrowRight, X } from 'lucide-react'
import { Button } from '../../../components/button'
import { useState } from 'react'
import { DateRange, DayPicker } from 'react-day-picker'
import { format } from 'date-fns'
import 'react-day-picker/dist/style.css'

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean
  eventStartAndEndDates: DateRange | undefined
  closeGuestsInput: () => void
  openGuestsInput: () => void
  setDestination: (destination: string) => void
  setEventStartAndEndDates: (dates: DateRange | undefined) => void
}

export function DestinationAndDateStep({
  closeGuestsInput,
  isGuestsInputOpen,
  openGuestsInput,
  setDestination,
  setEventStartAndEndDates,
  eventStartAndEndDates,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  function openDatePicker() {
    return setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    return setIsDatePickerOpen(false)
  }

  const displayedDate =
    eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
      ? format(eventStartAndEndDates.from, 'LLL d').concat(' - ').concat(format(eventStartAndEndDates.to, 'LLL d'))
      : null

  return (
    <div className='h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3'>
      <div className='flex items-center gap-2 flex-1'>
        <MapPin className='size-5 text-zinc-400' />
        <input
          disabled={isGuestsInputOpen}
          type='text'
          placeholder='Where are you going?'
          className='bg-transparent text-lg placeholder-zinc-400 outline-none flex-1'
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      <button onClick={openDatePicker} disabled={isGuestsInputOpen} className='flex items-center gap-2 text-left'>
        <Calendar className='size-5 text-zinc-400' />
        <span className='text-lg text-zinc-400 flex-1'>{displayedDate || 'When?'}</span>
      </button>

      {isDatePickerOpen && (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
          <div className='rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <h2 className='font-lg font-semibold'>Select the date</h2>
                <button>
                  <X className='size-5 text-zinc-400' onClick={closeDatePicker} />
                </button>
              </div>
            </div>
            <DayPicker mode='range' selected={eventStartAndEndDates} onSelect={setEventStartAndEndDates} />
          </div>
        </div>
      )}

      <div className='w-px h-6 bg-zinc-800' />

      {isGuestsInputOpen ? (
        <Button onClick={closeGuestsInput} variant='secondary'>
          Change location/date
          <Settings2 className='size-5' />
        </Button>
      ) : (
        <Button onClick={openGuestsInput}>
          Continue
          <ArrowRight className='size-5' />
        </Button>
      )}
    </div>
  )
}