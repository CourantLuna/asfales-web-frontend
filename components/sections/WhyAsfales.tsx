import {
  Search,
  Users,
  MapPin,
  CalendarCheck,
  Star,
  DollarSign
} from "lucide-react"

const features = [
  {
    icon: Search,
    title: "Comparador inteligente",
    desc: "Compara precios y opciones de múltiples proveedores en tiempo real"
  },
  {
    icon: Users,
    title: "Itinerarios colaborativos",
    desc: "Planifica tu viaje con amigos y familia de manera colaborativa"
  },
  {
    icon: MapPin,
    title: "Rutas automáticas",
    desc: "Genera rutas optimizadas basadas en tus preferencias"
  },
  {
    icon: CalendarCheck,
    title: "Actividades precisas",
    desc: "Encuentra actividades perfectamente adaptadas a tus gustos"
  },
  {
    icon: Star,
    title: "Club de destinos",
    desc: "Accede a ofertas exclusivas y experiencias premium"
  },
  {
    icon: DollarSign,
    title: "Presupuesto inteligente",
    desc: "Controla y optimiza tus gastos de viaje automáticamente"
  }
]

export default function WhyAsfales() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-2">¿Por qué elegir ASFΛLES?</h2>
      <p className="text-muted-foreground text-center mb-10">
        Características que hacen únicos tus viajes
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        {features.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-all"
          >
            <Icon className="text-[#0057A3] w-6 h-6 mb-2" />
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
