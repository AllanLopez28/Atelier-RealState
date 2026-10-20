const detalles = [
  "Mantenimiento incluido",
  "Áreas verdes de recreación",
  "Seguridad 24/7",
  "Ventanas francesas",
  "Cisterna de 2.5 m³",
  "Garage para 2 autos",
  "Jardín propio",
  "Diseño antisísmico",
];

// Franja continua con los detalles de la casa; se detiene al pasar el cursor
export default function Franja() {
  const fila = (oculta: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={oculta || undefined}>
      {detalles.map((detalle) => (
        <li key={detalle} className="flex items-center gap-10 pr-10 font-display text-frase">
          {detalle}
          <span className="h-1.5 w-1.5 rounded-full bg-arboleda" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Detalles de la casa" className="franja overflow-hidden bg-papel py-6">
      <div className="marquesina">
        {fila(false)}
        {fila(true)}
      </div>
    </section>
  );
}
