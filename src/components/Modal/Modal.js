import { useEffect } from "react";
import PropTypes from "prop-types";
import css from './Modal.module.css';
import { createPortal } from "react-dom";

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ close, largeImageURL }) => {
  const modalCloseOnClick =({target, currentTarget})=> {
    if (target === currentTarget) {
      close();
    }
  };

  useEffect(() => {
    const modalCloseOnEsc =({code})=> {
      if (code === 'Escape') {
        close();
      }
    };
 
    window.addEventListener('keydown', modalCloseOnEsc);

    return () => {
      window.removeEventListener('keydown', modalCloseOnEsc);
    };
  }, [close]);
    // const closeModal = ({ target, currentTarget, code }) => {
    //     if (target === currentTarget || code === 'Escape') {
    //         close();
    //     }
    // };
    
    // useEffect(() => {
    //     document.addEventListener("keydown", closeModal);
    //     return () => document.removeEventListener("keydown", closeModal);
    // }, [closeModal]);
    
    return (
            createPortal(
            <div className={css.overlay} onClick={modalCloseOnClick}>
            <div className={css.modal}>
            <img src={largeImageURL} alt="largeImageURL" />
            </div>
            </div>,
            modalRoot
        )
        
    )
}

Modal.propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    close: PropTypes.func.isRequired,
}
export default Modal;