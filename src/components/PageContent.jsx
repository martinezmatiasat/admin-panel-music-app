import { useState } from "react";
import DataTable from "react-data-table-component";
import Icon from "@/components/Icon";

const PageContent = ({ title, columns, items = [], actions = [], tableActions = [] }) => {
  const [search, setSearch] = useState('');

  /**
   * Añade una columna de acciones a la tabla si se proporcionan acciones de tabla
   * Cada acción se representa como un botón con un icono y una función de callback
   * Props de las columnas: name, selector, sortable, width.
   */
  const columnsWithTableActions = [
    ...columns,
    {
      name: "Acciones",
      cell: itemData => (
        <div className="flex gap-2">
          {tableActions.map((action, index) => (
            <button key={index} onClick={() => action.callback(itemData)}>
              <Icon name={action.iconName} />
            </button>
          ))}
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  // Filtro para buscar en los items
  const filteredItems = items.filter(item =>
    Object.values(item).some(value =>
      value !== null &&
      value !== undefined &&
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const customStyles = {
    table: {
      style: {
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
        fontSize: "1rem",
        border: "1px solid #d1d5db",
      },
    },
    headRow: {
      style: {
        fontWeight: "600",
        fontSize: "1rem",
      },
    },
    rows: {
      style: {
        fontSize: "1rem",
      },
    },
  };

  return (
    <div className="px-4 font-sans text-base">

      {/* Titulo de la página */}
      <h2 className="text-2xl font-bold">{title}</h2>

      <div className="flex items-center justify-between mt-6 mb-8">

        {/* Buscar en la tabla */}
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full max-w-sm focus:outline-none focus:ring focus:border-blue-300"
        />

        {/* Botones de acciones */}
        <div className="flex gap-2 ml-4">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.callback}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              <Icon name={action.iconName} />
              {action.label}
            </button>
          ))}
        </div>

      </div>

      {/* Tabla con acciones */}
      <DataTable
        columns={columnsWithTableActions}
        data={filteredItems}
        pagination
        highlightOnHover
        striped
        responsive
        customStyles={customStyles}
      />
    </div>
  );
};

export default PageContent;