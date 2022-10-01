import Socials from 'components/containers/Socials'

interface IPageTemplateProps {
  title: string
}

const FullPageTemplate = ({ title }: IPageTemplateProps) => {
  return (
    <div className="bg-n w-screen h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-primary text-5xl md:text-7xl uppercase font-mono">
        {title}
      </h1>
      <Socials />
    </div>
  )
}

export default FullPageTemplate
