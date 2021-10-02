import cn from 'classnames';
import { useEffect, useRef } from 'react';
import s from './style.module.css';

function Modal({isOpen, title, children,onCloseModal}) {
    useEffect( () => {
        document.querySelector('body').style.overflow = isOpen ? 'hidden' : null;
    }, [isOpen])

    const modalEl = useRef();

    const handleClickCloseModal = () =>{
        onCloseModal && onCloseModal(false);
    }
    const handleClickRoot = (event) => {
        if( !modalEl.current.contains(event.target) )
            handleClickCloseModal();
    }
    return (
        <div className={cn(s.root, {[s.open] : isOpen})}
             onClick={handleClickRoot}>
            <div className={s.modal} 
                 ref={modalEl}>
                <div className={s.head}>
                              {title}
                    <span className={s.btnClose}
                          onClick={handleClickCloseModal}
                            >

                            </span>
                </div>
                <div className={s.content}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal
