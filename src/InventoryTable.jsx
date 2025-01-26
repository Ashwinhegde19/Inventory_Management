/* eslint-disable react/prop-types */

const InventoryTable = ({ items, onEdit, onDelete, filter, setFilter, sortAsc, setSortAsc }) => {
  const categories = [...new Set(items.map(item => item.category))]

  return (
    <div className="mt-4">
      <form>
        <div className="row align-items-center mb-3">
          <div className="col-auto">
            <label className="me-2">Filter by Category:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="form-select d-inline-block w-auto"
            >
              <option value="">All</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div className="col-auto">
            <label className="me-2">Sort by Quantity:</label>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setSortAsc(!sortAsc)}
            >
              {sortAsc ? 'Ascending' : 'Descending'}
            </button>
          </div>
        </div>
      </form>
      <table className="table table-striped table-bordered table-hover mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id} className={item.quantity < 10 ? 'table-danger' : ''}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => onEdit(item)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => onDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default InventoryTable