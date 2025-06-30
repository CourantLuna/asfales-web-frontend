import {
  PlaneTakeoff,
  Users,
  Route,
  CalendarCheck,
  BellRing,
  PiggyBank
} from "lucide-react"

const features = [
  {
    icon: PlaneTakeoff,
    title: "Reserva el mejor vuelo al mejor precio",
    desc: "Encuentra vuelos, buses o ferris combinados con la mejor relación costo-beneficio"
  },
  {
    icon: Users,
    title: "Organiza tu viaje grupal fácilmente",
    desc: "Comparte itinerarios, asigna precios y coordina con amigos en tiempo real"
  },
  {
    icon: Route,
    title: "Crea rutas inteligentes sin esfuerzo",
    desc: "Asfales arma por ti el recorrido ideal según tu presupuesto y estilo de viaje"
  },
  {
    icon: CalendarCheck,
    title: "Agrega actividades con solo un clic",
    desc: "Elige experiencias y eventos recomendadas según la ciudad y fechas del viaje"
  },
  {
    icon: BellRing,
    title: "Activa alertas de precios y vuelos",
    desc: "Recibe notificaciones cuando bajen los precios o haya cambios importantes"
  },
  {
    icon: PiggyBank,
    title: "Planifica según tu presupuesto",
    desc: "Indica cuánto quieres gastar y recibe recomendaciones optimizadas"
  }
]

export default function WhyAsfales() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-start mb-2">¿Por qué elegir ASFΛLES?</h2>
      <p className="text-muted-foreground text-start mb-10">
        Pensado para viajeros reales como tú
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {features.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="bg-card text-card-foreground rounded-xl shadow-sm hover:shadow-md transition-all flex"
          >
            {/* Columna izquierda (30%) */}
            <div className="w-[30%] flex items-center justify-center bg-muted rounded-l-xl">
              <Icon className="text-primary w-16 h-16" />
            </div>

            {/* Columna derecha (70%) */}
            <div className="w-[70%] p-4 flex flex-col justify-center">
              <h3 className="font-semibold text-lg mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
