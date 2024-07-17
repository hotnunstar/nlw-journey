import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { CreateActivityModal } from './create-activity-modal'
import { ImportantLinks } from './important-links'
import { Guests } from './guests'
import { Activities } from './activities'
import { DestinationAndDateHeader } from './destination-and-date-header'
import { CreateLinkModal } from './create-link-modal'
import { api } from '../../lib/axios'
import { useParams } from 'react-router-dom'
import { InviteGuestsModal } from './invite-guests-modal'

export interface Trip {
  id: string
  destination: string
  starts_at: string
  ends_at: string
  is_confirmed: boolean
}

export interface Participant {
  id: string
  name: string | null
  email: string
  is_confirmed: boolean
}

export function TripDetailsPage() {
  const { tripId } = useParams()
  const [trip, setTrip] = useState<Trip | undefined>()
  const [participants, setParticipants] = useState<Participant[]>()
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false)
  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false)
  const [isInviteGuestsModalOpen, setIsInviteGuestsModalOpen] = useState(false)

  useEffect(() => {
    api.get(`/trips/${tripId}`).then((response) => setTrip(response.data.trip))
  }, [tripId])

  useEffect(() => {
    api.get(`/trips/${tripId}/participants`).then((response) => setParticipants(response.data.participants))
  }, [tripId])

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true)
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false)
  }

  function openCreateLinkModal() {
    setIsCreateLinkModalOpen(true)
  }

  function closeCreateLinkModal() {
    setIsCreateLinkModalOpen(false)
  }

  function openInviteGuestsModal() {
    setIsInviteGuestsModalOpen(true)
  }

  function closeInviteGuestsModal() {
    setIsInviteGuestsModalOpen(false)
    window.location.reload()
  }

  return (
    <div className='max-w-6xl px-6 py-10 mx-auto space-y-8'>
      <DestinationAndDateHeader />

      <main className='flex gap-16 px-4'>
        <div className='flex-1 space-y-6'>
          <div className='flex items-center justify-between'>
            <h2 className='text-3xl font-semibold'>Activities</h2>

            <button
              onClick={openCreateActivityModal}
              className='bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400'
            >
              <Plus className='size-5' />
              Add new activity
            </button>
          </div>

          <Activities />
        </div>

        <div className='w-80 space-y-6'>
          <ImportantLinks openCreateLinkModal={openCreateLinkModal} />

          <div className='w-full h-px bg-zinc-800' />

          <Guests participants={participants} openInviteGuestsModal={openInviteGuestsModal} />
        </div>
      </main>

      {isCreateActivityModalOpen && <CreateActivityModal closeCreateActivityModal={closeCreateActivityModal} trip={trip} />}
      {isCreateLinkModalOpen && <CreateLinkModal closeCreateLinkModal={closeCreateLinkModal} />}
      {isInviteGuestsModalOpen && (<InviteGuestsModal participants={participants} setParticipants={setParticipants} closeInviteGuestsModal={closeInviteGuestsModal} />)}
    </div>
  )
}