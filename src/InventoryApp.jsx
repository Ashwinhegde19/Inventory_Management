import { useState } from 'react'
import InventoryTable from './InventoryTable'
import InventoryModal from './InventoryModal'
import 'bootstrap/dist/css/bootstrap.min.css'

const InventoryApp = () => {
  const [state, setState] = useState({
    items: [],
    modalData: { show: false, item: null },
    filter: '',
    sortAsc: true,
  })

  const addItem = (item) => {
    setState((prevState) => ({
      ...prevState,
      items: [
        ...prevState.items,
        { ...item, id: prevState.items.length ? Math.max(prevState.items.map((i) => i.id)) + 1 : 1 },
      ],
    }))
  }

  const editItem = (updatedItem) => {
    setState((prevState) => ({
      ...prevState,
      items: prevState.items.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
    }))
  }

  const deleteItem = (id) => {
    setState((prevState) => ({
      ...prevState,
      items: prevState.items.filter((item) => item.id !== id),
    }))
  }

  const setFilter = (filter) => {
    setState((prevState) => ({
      ...prevState,
      filter,
    }))
  }

  const setSortAsc = (sortAsc) => {
    setState((prevState) => ({
      ...prevState,
      sortAsc,
    }))
  }

  const setModalData = (modalData) => {
    setState((prevState) => ({
      ...prevState,
      modalData,
    }))
  }

  const filteredItems = state.filter
    ? state.items.filter((item) => item.category === state.filter)
    : state.items
  const sortedItems = [...filteredItems].sort((a, b) =>
    state.sortAsc ? a.quantity - b.quantity : b.quantity - a.quantity
  )

  return (
    <div className="container">
      <h1>Inventory Management</h1>
      <button
        className="btn btn-primary"
        onClick={() => setModalData({ show: true, item: null })}
      >
        Add Item
      </button>
      <InventoryTable
        items={sortedItems}
        onEdit={(item) => setModalData({ show: true, item })}
        onDelete={deleteItem}
        filter={state.filter}
        setFilter={setFilter}
        sortAsc={state.sortAsc}
        setSortAsc={setSortAsc}
      />
      {state.modalData.show && (
        <InventoryModal
          show={state.modalData.show}
          editingItem={state.modalData.item}
          onSubmit={state.modalData.item ? editItem : addItem}
          onHide={() => setModalData({ show: false, item: null })}
        />
      )}
    </div>
  )
}

export default InventoryApp