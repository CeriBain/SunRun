import type { Route } from '../lib/routing'

interface RoutePanelProps {
  routes: Route[]
  onSelect: (route: Route) => void
  selectedIndex: number | null
}

export function RoutePanel({
  routes,
  onSelect,
  selectedIndex,
}: RoutePanelProps) {
  return (
    <div className="flex flex-col gap-2 p-4 bg-white rounded-xl shadow">
      {routes.map((route, i) => (
        <div
          key={i}
          onClick={() => onSelect(route)}
          className={`p-3 rounded-lg border-2 cursor-pointer ${
            selectedIndex === i ? 'border-green-500' : 'border-gray-200'
          }`}
        >
          <div className="flex justify-between text-sm font-medium">
            <span>Route {i + 1}</span>
            <span>{(route.distance / 1000).toFixed(1)} km</span>
          </div>
          <div className="flex gap-4 text-xs text-gray-500 mt-1">
            <span>{Math.round(route.duration / 60)} min</span>
            <span>{route.elevationGain}m elevation</span>
          </div>
        </div>
      ))}
    </div>
  )
}
