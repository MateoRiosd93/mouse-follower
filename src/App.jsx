import { useEffect, useState } from "react";

// NOTA: es buena practica tener varios useEffect en caso de necesitarlo ya que luego esto se puede separar en varios
// customhook, y ps ahi tambien se romparia el pricipio de unica responsabilidad. y mantenimiento del code.

const FollowMouse = () => {
  const [enable, setEnable] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // El useEffect es importante por que aca decidimos a que cosas suscribirnos.
  // eventos, llamados a apis.
  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event;
      setPosition({ x: clientX, y: clientY });
    };

    if (enable) {
      window.addEventListener("pointermove", handleMove);
    }
    // IMPORTANTE: el metodo getEventListeners() no ayuda a identificar que suscripciones tenemos activas.
    // retorna una funcion en la cual se ejecutara cuando se desmonte el componente - cada que cambie una dependency antes de ejecutar el evento.
    // Sirve para desuscribirnos a eventos. -> clean useEffect
    return () => {
      window.removeEventListener("pointermove", handleMove);
    };
  }, [enable]);
  // arreglo de dependencias
  // si no se pone, se renderiza cada vez q el componente lo haga.
  // si se pone [], se renderiza una unica vez.
  // si se le pone una dependencia, se ejecutara cada que esta cambie.

  useEffect(() => {
    document.body.classList.toggle('no-cursor', enable)

    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enable])

  return (
    <>
      <div
        style={{
          position: "absolute",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          border: "1px solid #fff",
          borderRadius: "50%",
          opacity: 0.8,
          pointerEvents: "none",
          left: -25,
          top: -25,
          width: 50,
          height: 50,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      ></div>
      <button onClick={() => setEnable(!enable)}>
        {enable ? "Desactivar" : "Activar"} seguir puntero
      </button>
    </>
  );
};

function App() {
  return <main>
    <FollowMouse/>
  </main>;
}

export default App;
