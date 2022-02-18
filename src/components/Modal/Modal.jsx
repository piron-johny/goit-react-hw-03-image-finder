import { StyledModal } from './Modal.styled';
import { createPortal } from 'react-dom';
import { IoCloseCircleSharp } from 'react-icons/io5';

const modalRoot = document.getElementById('root-modal');

const Modal = ({ modalObject, isModal, onCloseModal }) => {
  console.log('modalObject :>> ', modalObject);
  return createPortal(
    <StyledModal className={isModal && 'active'}>
      <div>
        <img src={modalObject.largeImageURL} alt={modalObject.tags} />
        <button type="button" onClick={onCloseModal}>
          <IoCloseCircleSharp size="40" color='white'/>
        </button>
      </div>
    </StyledModal>,
    modalRoot
  );
};

export default Modal;
// IoCloseCircleSharp
