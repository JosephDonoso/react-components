interface CardProps {
    title: string
    subtitle?: string
    description: string
    imageUrl?: string
    imageAlt?: string
    tags?: string[]
    actionLabel?: string
    onAction?: () => void
  }
  
  export default function Card({
    title,
    subtitle,
    description,
    imageUrl = "/placeholder.svg?height=200&width=400",
    imageAlt = "Card image",
    tags = [],
    actionLabel = "Learn More",
    onAction = () => {},
  }: CardProps) {
    return (
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white text-gray-900 shadow-sm transition-all hover:shadow-md">
        {imageUrl && (
          <div className="relative h-48 w-full overflow-hidden">
            <img src={imageUrl || "/placeholder.svg"} alt={imageAlt} className="h-full w-full object-cover" />
          </div>
        )}
        <div className="p-6">
          <div className="space-y-1.5">
            <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
          <div className="mt-4">
            <p className="text-gray-500">{description}</p>
          </div>
          {tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="mt-6 flex justify-end">
            <button
              onClick={onAction}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              {actionLabel}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  