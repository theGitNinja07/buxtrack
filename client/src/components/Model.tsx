import React, { FormEvent, useEffect, useRef } from 'react'

interface ModalProps {
  title?: string
  text?: string
  children: React.ReactNode
  visible: boolean
  onClose?: () => void
  handleSubmit?: () => void
}

const Modal: React.FC<ModalProps> = ({ visible, onClose, text, title, children, handleSubmit: formsubmit }) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (!modalRef.current) {
      return
    }
    visible ? modalRef.current.showModal() : modalRef.current.close()
  }, [visible])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formsubmit) formsubmit()
    else {
      console.log('Form submit')
    }
  }

  const handleClose = () => {
    if (onClose) {
      onClose()
    }
  }

  const handleESC = (event: React.FormEvent) => {
    event.preventDefault()
    handleClose()
  }

  return (
    <dialog ref={modalRef} id="my_modal_1" className="modal" onCancel={handleESC}>
      <form onSubmit={handleSubmit} className="modal-box">
        {title && <h3 className="text-lg font-bold">{title}</h3>}
        {text && <p className="py-4">{text}</p>}
        {children}
        <div className="modal-action">
          <button type="submit" className="btn btn-success">
            Save
          </button>
          <button formMethod="dialog" type="button" className="btn btn-error" onClick={handleClose}>
            Close
          </button>
        </div>
      </form>
    </dialog>
  )
}

export default Modal
