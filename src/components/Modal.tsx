import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  confirmText,
  cancelText,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-buttons">
          {cancelText ? (
            <button onClick={onClose}>{cancelText}</button>
          ) : (
            <div />
          )}
          {confirmText ? (
            <button onClick={onConfirm}>{confirmText}</button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
