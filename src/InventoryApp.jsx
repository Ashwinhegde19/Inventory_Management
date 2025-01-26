import { useState } from "react";
import InventoryTable from "./InventoryTable";
import InventoryModal from "./InventoryModal";

const InventoryApp = () => {
  const [state, setState] = useState({
    items: [],
    showModal: false,
    editingItem: null,
    filter: "",
    sortAsc: true,
  });

  const addItem = (item) => {
    setState((prevState) => ({
      ...prevState,
      items: [
        ...prevState.items,
        {
          ...item,
          id: prevState.items.length
            ? Math.max(prevState.items.map((i) => i.id)) + 1
            : 1,
        },
      ],
    }));
  };

  const editItem = (updatedItem) => {
    setState((prevState) => ({
      ...prevState,
      items: prevState.items.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      ),
    }));
  };

  const deleteItem = (id) => {
    setState((prevState) => ({
      ...prevState,
      items: prevState.items.filter((item) => item.id !== id),
    }));
  };

  const setFilter = (filter) => {
    setState((prevState) => ({
      ...prevState,
      filter,
    }));
  };

  const setSortAsc = (sortAsc) => {
    setState((prevState) => ({
      ...prevState,
      sortAsc,
    }));
  };

  const setShowModal = (showModal) => {
    setState((prevState) => ({
      ...prevState,
      showModal,
    }));
  };

  const setEditingItem = (editingItem) => {
    setState((prevState) => ({
      ...prevState,
      editingItem,
    }));
  };

  const filteredItems = state.filter
    ? state.items.filter((item) => item.category === state.filter)
    : state.items;
    
  const sortedItems = [...filteredItems].sort((a, b) =>
    state.sortAsc ? a.quantity - b.quantity : b.quantity - a.quantity
  );

  return (
    <div className="container">
      <h1>Inventory Management</h1>
      <button
        className="btn btn-primary"
        onClick={() => {
          setEditingItem(null);
          setShowModal(true);
        }}
      >
        Add Item
      </button>
      <InventoryTable
        items={sortedItems}
        onEdit={(item) => {
          setEditingItem(item);
          setShowModal(true);
        }}
        onDelete={deleteItem}
        filter={state.filter}
        setFilter={setFilter}
        sortAsc={state.sortAsc}
        setSortAsc={setSortAsc}
      />
      {state.showModal && (
        <InventoryModal
          show={state.showModal}
          editingItem={state.editingItem}
          onSubmit={state.editingItem ? editItem : addItem}
          onHide={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default InventoryApp;
