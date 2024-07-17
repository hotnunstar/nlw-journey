import { X, AtSign, Plus, CheckCircle2, CircleDashed } from 'lucide-react'
import { Button } from '../../components/button'
import { Participant } from '.'
import { api } from '../../lib/axios'
import { useParams } from 'react-router-dom'
import { Dispatch, FormEvent, SetStateAction, useRef } from 'react'

interface InviteGuestsModalProps {
  participants: Participant[] | undefined
  setParticipants: Dispatch<SetStateAction<Participant[] | undefined>>
  closeInviteGuestsModal: () => void
}

export function InviteGuestsModal({ participants, setParticipants, closeInviteGuestsModal }: InviteGuestsModalProps) {
  const { tripId } = useParams()
  const emailInputRef = useRef<HTMLInputElement>(null)

  async function inviteGuest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email) {
      alert('Please, insert an email to continue.')
      return
    }

    await api.post(`/trips/${tripId}/invites`, { email })
    await api.get(`/trips/${tripId}/participants`).then((response) => setParticipants(response.data.participants))

    if (emailInputRef.current) emailInputRef.current.value = ''
  }

  async function confirmGuest(participant: Participant) {
    if (window.confirm(`Are you sure you want to confirm ${participant.email} from the guest list?`)) await api.get(`/participants/${participant.id}/confirm`)
  }

  return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
      <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <h2 className='font-lg font-semibold'>Managing guests</h2>
            <button>
              <X className='size-5 text-zinc-400' onClick={closeInviteGuestsModal} />
            </button>
          </div>

          <p className='text-sm text-zinc-400'>New guests will receive an email to confirm their participation in the trip.</p>
        </div>

        <div className='w-full h-px bg-zinc-800' />

        <div className='space-y-5'>
          {participants?.map((participant, index) => {
            return (
              <div key={participant.id} className='flex items-center justify-between gap-4'>
                <div className='space-y-1.5'>
                  <span className='block text-sm font-medium text-zinc-100'>{participant.name ?? `Guest ${index}`}</span>
                  <span className='block text-sm text-zinc-400 truncate'>{participant.email}</span>
                </div>
                {participant.is_confirmed ? (
                  <CheckCircle2 className='text-green-400 size-5 shrink-0' />
                ) : (
                  <button type='button' onClick={() => confirmGuest(participant)} className='hover:bg-green-400 hover:rounded-full group'>
                    <CircleDashed className='text-zinc-400 size-5 shrink-0 group-hover:text-green-400' />
                  </button>
                )}
              </div>
            )
          })}
        </div>

        <div className='w-full h-px bg-zinc-800' />

        <form onSubmit={inviteGuest} className='p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
          <div className='px-2 flex items-center flex-1 gap-2'>
            <AtSign className='text-zinc-400 size-5' />
            <input
              ref={emailInputRef}
              type='email'
              name='email'
              placeholder="Enter the guest's email address"
              className='bg-transparent text-lg placeholder-zinc-400 outline-none flex-1'
            />
          </div>

          <Button type='submit'>
            Invite
            <Plus className='size-5' />
          </Button>
        </form>
      </div>
    </div>
  )
}
