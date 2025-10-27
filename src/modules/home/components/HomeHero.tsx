type Props = {
  userName?: string;
  onContinue?: () => void;
  illustrationUrl?: string;
};

export default function HomeHero({ userName, illustrationUrl }: Props) {
  return (
    <section className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-br from-orange-100 via-orange-50 to-amber-50 p-8 md:p-12 shadow-lg border border-orange-100">
      {/* fondo  */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ea580c' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-3xl">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="text-sm font-medium text-orange-600">
            Hola, {userName?.split(" ")[0]}
          </span>
          <span className="text-lg">👋</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Bienvenida a <span className="text-primary">Tintas Formoseñas</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl">
          Descubrí nuevas lecturas o retomá donde te quedaste.
        </p>

        {/* decoracion */}
        <div className="mt-6 flex items-center gap-3">
          <div className="h-1 w-12 bg-primary rounded-full" />
          <div className="h-1 w-6 bg-primary/60 rounded-full" />
          <div className="h-1 w-3 bg-primary/30 rounded-full" />
        </div>
      </div>

      {illustrationUrl && (
        <img
          src={illustrationUrl || "/placeholder.svg"}
          alt=""
          aria-hidden
          className="pointer-events-none absolute right-10 bottom-0 top-0 w-48 md:w-72 opacity-90 drop-shadow-lg"
        />
      )}
    </section>
  );
}
