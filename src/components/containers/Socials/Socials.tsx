import Image from 'next/image'
import linkedin from 'assets/images/icons/linkedin.svg'
import github from 'assets/images/icons/github.svg'

const data = [
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
    <div className="grid grid-cols-2 gap-2 mt-4">
      {data.map(({ href, icon, name }) => {
        return (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-70"
          >
            <Image src={icon} width={40} height={40} alt={name} />
          </a>
        )
      })}
    </div>
  )
}

export default Socials
