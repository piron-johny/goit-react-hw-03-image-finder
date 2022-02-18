import { StyledModal } from './Modal.styled';
import { createPortal } from 'react-dom';
import { IoCloseCircleSharp } from 'react-icons/io5';

const modalRoot = document.getElementById('root-modal');



const Modal = ({ modalObject, isModal, onCloseModal }) => {
  const {largeImageURL, tags} = modalObject;
  console.log('largeImageURL :>> ', largeImageURL);
  return createPortal(
    <StyledModal className={isModal && 'active'}>
      <div>
        <img src={largeImageURL} alt={tags} />
        <button type="button" onClick={onCloseModal}>
          <IoCloseCircleSharp className='closeBtn' />
        </button>
      </div>
    </StyledModal>,
    modalRoot
  );
};

export default Modal;
