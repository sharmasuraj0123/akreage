interface ProjectCardProps {
  title: string
  location: string
  progress: number
  image: string
  status?: string
  onClick: () => void
}

export const ProjectCard = ({ title, location, progress, image, status, onClick }: ProjectCardProps) => {
  return (
    <div 
      className="bg-white rounded-lg shadow overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
      onClick={onClick}
    >
      <div className="relative h-48">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        {status && (
          <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
            {status}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{location}</p>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
} 