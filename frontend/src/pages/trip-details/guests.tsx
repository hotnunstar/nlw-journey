import { CheckCircle2, CircleDashed, UserCog } from 'lucide-react'
import { Button } from '../../components/button'
import { Participant } from '.'

interface GuestProps {
  participants: Participant[] | undefined
  openInviteGuestsModal: () => void
}

export function Guests({ participants, openInviteGuestsModal }: GuestProps) {
  return (
    <div className='space-y-6'>
      <h2 className='font-semibold text-xl'>Guests</h2>

      <div className='space-y-5'>
        {participants?.map((participant, index) => {
          return (
            <div key={participant.id} className='flex items-center justify-between gap-4'>
              <div className='space-y-1.5'>
                <span className='block font-medium text-zinc-100'>{participant.name ?? `Guest ${index}`}</span>
                <span className='block text-sm text-zinc-400 truncate'>{participant.email}</span>
              </div>
              {participant.is_confirmed ? (
                <CheckCircle2 className='text-green-400 size-5 shrink-0'></CheckCircle2>
              ) : (
                <CircleDashed className='text-zinc-400 size-5 shrink-0' />
              )}
            </div>
          )
        })}
      </div>

      <Button onClick={openInviteGuestsModal} variant='secondary' size='full'>
        <UserCog className='size-5' />
        Managing guests
      </Button>
    </div>
  )
}
