import Image from 'next/image'
import linkedin from 'assets/images/icons/linkedin.svg'
import github from 'assets/images/icons/github.svg'
import email from 'assets/images/icons/email.svg'

const data = [
  {
    href: 'mailto:siejeksebastian@gmail.com',
    icon: email,
    name: 'Email',
  },
  {
    href: 'https://www.linkedin.com/in/sebastiansiejek',
    icon: linkedin,
    name: 'LinkedIn',
  },
  {
    href: 'https://github.com/sebastiansiejek',
    icon: github,
    name: 'GitHub',
  },
]

const Socials: React.FunctionComponent = () => {
  return (
    <div className="flex gap-2 mt-4">
      {data.map(({ href, icon, name }) => {
        return (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity block w-[40px] h-[40px] hover:opacity-70"
          >
            <Image src={icon} width={40} height={40} alt={name} />
          </a>
        )
      })}
    </div>
  )
}

export default Socials
