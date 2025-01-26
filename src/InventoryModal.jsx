/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

function InventoryModal({ show, onHide, onSubmit, editingItem }) {
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    if (editingItem) {
      reset({
        name: editingItem.name,
        category: editingItem.category,
        quantity: editingItem.quantity,
      })
    } else {
      reset({})
    }
  }, [editingItem, reset])

  const submitHandler = (data) => {
    onSubmit({
      ...editingItem,
      name: data.name,
      category: data.category,
      quantity: Number(data.quantity),
    })
    onHide()
  }

  if (!show) return null

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="modal-header">
              <h5 className="modal-title">{editingItem ? 'Edit Item' : 'Add New Item'}</h5>
              <button type="button" className="btn-close" onClick={onHide}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="formItemName" className="form-label">Item Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="formItemName"
                  placeholder="Enter item name"
                  {...register('name', { required: true })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="formCategory" className="form-label">Category</label>
                <input
                  type="text"
                  className="form-control"
                  id="formCategory"
                  placeholder="Enter category"
                  {...register('category', { required: true })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="formQuantity" className="form-label">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  id="formQuantity"
                  placeholder="Enter quantity"
                  {...register('quantity', { required: true, min: 0 })}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onHide}>
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                {editingItem ? 'Save Changes' : 'Add Item'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default InventoryModal