import { SettingsQueryResult } from '../../sanity.types'
import { FollowMe } from '../follow-me/follow-me'

export const Footer = ({
  email
}: Omit<NonNullable<SettingsQueryResult>['info'], 'resume' | 'thumbnail'>) => {
  return (
    <footer className="relative z-2 bg-blue-500 text-white px-5 md:px-10 2xl:px-20 py-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
        <p className="text-sm max-w-sm">
          If you wish to contact me, please feel free to reach out via email at{' '}
          {email}.
        </p>
        <FollowMe color="light" />
      </div>
    </footer>
  )
}
