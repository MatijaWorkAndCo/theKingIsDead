import ReactModal from 'react-modal';
import styles from './Modal.module.scss';

const Modal = ({modalIsOpen,currentPlayer,toggleModal}) => {
    const message = currentPlayer === 'playerTwo'?'Player one turn has ended, next to play is player two.': 'Player two turn has ended, next to play is player one.'
    
    return(
        <ReactModal
            isOpen={modalIsOpen}
            onRequestClose={toggleModal}
            style={styles.reactModal}
            contentLabel="Example Modal"
            closeTimeoutMS={500}
            ariaHideApp={false}
        >
            <div className={styles.modalContainer}>
                <div className={styles.modalBox}>
                    
                    <div className={styles.modalBoxInner} onClick={toggleModal}>
                        <span className={styles.message}>{message}</span>
                        <div className={styles.next}> <span>Next</span> </div>
                    </div>
                </div>
            </div>
        </ReactModal>  
    )
}

export default Modal;
