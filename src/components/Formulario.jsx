import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Alerta from "./Alerta";

const Formulario = ({ cliente }) => {
  const navigate = useNavigate();

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .required("El nombre del cliente es obligatorio")
      .min(3, "El nombre es muy corto")
      .max(20, "El nombre es muy largo"),
    empresa: Yup.string().required("El nombre de la empresa es obligatorio"),
    email: Yup.string()
      .email("Email no valido")
      .required("El correo electrónico el obligatorio"),
    telefono: Yup.number("Debe ser un número válido")
      .positive("Número no valido")
      .integer("Número no valido")
      .typeError("El número no es válido"),
  });

  const handleSubmit = async (valores) => {
    try {
      let respuesta;
      if (cliente.id) {
        const url = `http://localhost:4000/clientes/${cliente.id}`;
        respuesta = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        const url = "http://localhost:4000/clientes";
        respuesta = await fetch(url, {
          method: "POST",
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      await respuesta.json();
      navigate("/clientes");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
        {cliente?.nombre ? "Editar Cliente" : "Agregar cliente"}
      </h1>
      <Formik
        initialValues={{
          nombre: cliente?.nombre ?? "",
          empresa: cliente?.empresa ?? "",
          email: cliente?.email ?? "",
          telefono: cliente?.telefono ?? "",
          notas: cliente?.notas ?? "",
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);
          resetForm();
        }}
        validationSchema={nuevoClienteSchema}
      >
        {({ errors, touched }) => (
          <Form className="mt-10">
            <div className="mb-4">
              <label htmlFor="nombre" className="text-gray-800">
                Nombre
              </label>
              <Field
                type="text"
                className="mt-2 block w-full p-3 bg-gray-50"
                id="nombre"
                placeholder="Nombre del cliente"
                name="nombre"
              />
              {errors.nombre && touched.nombre && (
                <Alerta>{errors.nombre}</Alerta>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="empresa" className="text-gray-800">
                Empresa
              </label>
              <Field
                type="text"
                className="mt-2 block w-full p-3 bg-gray-50"
                id="empresa"
                placeholder="Empresa del cliente"
                name="empresa"
              />
              {errors.empresa && touched.empresa && (
                <Alerta>{errors.empresa}</Alerta>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="text-gray-800">
                Email
              </label>
              <Field
                type="email"
                className="mt-2 block w-full p-3 bg-gray-50"
                id="email"
                placeholder="Email del cliente"
                name="email"
              />
              {errors.email && touched.email && <Alerta>{errors.email}</Alerta>}
            </div>

            <div className="mb-4">
              <label htmlFor="telefono" className="text-gray-800">
                Telefono
              </label>
              <Field
                type="tel"
                className="mt-2 block w-full p-3 bg-gray-50"
                id="telefono"
                placeholder="Telefono del cliente"
                name="telefono"
              />
              {errors.telefono && touched.telefono && (
                <Alerta>{errors.telefono}</Alerta>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="notas" className="text-gray-800">
                Notas
              </label>
              <Field
                as="textarea"
                type="text"
                className="mt-2 block w-full p-3 bg-gray-50 h-40"
                id="notas"
                placeholder="Notas del cliente"
                name="notas"
              />
            </div>
            <input
              type="submit"
              value={cliente?.nombre ? "Editar Cliente" : "Agregar cliente"}
              className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

Formulario.defaultProps = {
  cliente: {},
};

export default Formulario;
