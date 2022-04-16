import Formulario from "../components/Formulario";

const NuevoClientes = () => {
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900 ">Nuevo Cliente</h1>
      <p className="mt-3">
        Llena los siguiente campos para registrar un cliente
      </p>
      <Formulario />
    </>
  );
};

export default NuevoClientes;
