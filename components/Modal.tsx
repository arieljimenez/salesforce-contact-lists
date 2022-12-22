import React from 'react';

import Button from './Button';

const Modal = (props: iModalProps): React.ReactElement => {
  if (!props.show) return <></>;

  return (
    <div className="modal fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto show"
      id="ContactModal" tabIndex={-1} aria-labelledby="modalLabel" aria-hidden="true"
    >
      <div className="modal-dialog relative w-auto pointer-events-none">
        <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
          <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
            <h5 className="text-xl font-medium leading-normal text-gray-800" id="modalLabel">
              {props.title}
            </h5>
            <button type="button" className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={props.handleCloseBtnClick}
            />
          </div>
          <div className="modal-body relative p-4">
            {props.children}
          </div>
          <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
            <Button customClasses="bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 active:bg-purple-800 mx-2"
              text={props.cancelText}
              handleOnClick={props.handleCloseBtnClick}
            />
            <Button customClasses="bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800"
              text={props.saveText}
              handleOnClick={props.handleSaveBtnClick}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

Modal.defaultProps = {
  show: false,
  title: '',
  cancelText: 'Cancel',
  saveText: 'Save',
  children: null,
  handleCloseBtnClick: () => { },
  handleSaveBtnClick: () => { },
}

interface iModalProps {
  show?: boolean,
  title?: string,
  cancelText?: string,
  saveText?: string,
  children?: React.ReactNode,
  handleCloseBtnClick: () => void,
  handleSaveBtnClick: () => void,
}

export default Modal;
