type SectionTitleProps = {
  title: string
  subtitle?: string
  center?: boolean
}

export function Title({ title, subtitle, center }: SectionTitleProps) {
  return (
    <div className={`mb-10 ${center ? 'text-center' : ''}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-blue-900 dark:text-blue-300">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          {subtitle}
        </p>
      )}
    </div>
  )
}
