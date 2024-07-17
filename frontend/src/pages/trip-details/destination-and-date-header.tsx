import { MapPin, Calendar, Share2 } from 'lucide-react'
import { Button } from '../../components/button'
import { useParams } from 'react-router-dom'
import { api } from '../../lib/axios'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { Trip } from '.'

export function DestinationAndDateHeader() {
  const { tripId } = useParams()
  const [trip, setTrip] = useState<Trip | undefined>()
  const [isLinkCopied, setIsLinkCopied] = useState(false)

  useEffect(() => {
    api.get(`/trips/${tripId}`).then((response) => setTrip(response.data.trip))
  }, [tripId])

  const displayedDate = trip ? format(trip.starts_at, 'LLLL d').concat(' - ').concat(format(trip.ends_at, 'LLLL d, u')) : null

  function openLinkCopiedModal() {
    const currentLink = window.location.href
    navigator.clipboard
      .writeText(currentLink)
      .then(() => {
        setIsLinkCopied(true)
        setTimeout(() => {
          setIsLinkCopied(false)
        }, 1000)
      })
  }

  return (
    <div className='px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between'>
      <div className='flex items-center gap-2'>
        <MapPin className='size-5 text-zinc-400' />
        <span className='text-zinc-100'>{trip?.destination}</span>
      </div>

      <div className='flex items-center gap-5'>
        <div className='flex items-center gap-2'>
          <Calendar className='size-5 text-zinc-400' />
          <span className='text-zinc-100'> {displayedDate}</span>
        </div>

        <div className='w-px h-6 bg-zinc-800' />

        <Button onClick={openLinkCopiedModal} variant='secondary'>
          Share trip details
          <Share2 className='size-5' />
        </Button>
      </div>

      {isLinkCopied && (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
          <div className='rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
            <p className='text-sm text-zinc-400'>Link copied to clipboard</p>
          </div>
        </div>
      )}
    </div>
  )
}
