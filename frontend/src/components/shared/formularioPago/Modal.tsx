import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import Slide from '@mui/material/Slide'
import { type TransitionProps } from '@mui/material/transitions'

const Transition = React.forwardRef(function Transition (
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

interface ModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  formToken: string
}

export const Modal: React.FC<ModalProps> = ({ open, setOpen, formToken }) => {
  const handleClose = (): void => {
    setOpen(false)
  }

  // useEffect(() => {
  //   if (formToken) {
  //     // Load and configure KRGlue here
  //     KRGlue.loadLibrary(endpoint, publicKey).then(({ KR, result }) => {
  //       KR.setFormConfig({ formToken, language: 'en' })
  //       KR.onSubmit(handlePaymentSubmit)
  //       KR.onError(handlePaymentError)
  //       // Attach and show the form
  //       KR.attachForm('#myPaymentForm').then(({ result }) => {
  //         KR.showForm(result.formId)
  //       })
  //     })
  //   }
  // }, [formToken])

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      className=" m-auto form_to_payment"
    >
      {
        // eslint-disable-next-line react/no-unknown-property
        <div className="kr-embedded w-full h-full" kr-form-token={formToken} id="myPaymentForm">
          <div className="flex-container">
            <div className="kr-pan"></div>
          </div>
          <div className="flex-container">
            <div className="kr-expiry"></div>
            <div className="kr-security-code"></div>
          </div>
          <div className="flex-container">
            <div className="kr-email">
              <input
                type="text"
                name="acme-email"
                placeholder="email"
                className="kr-theme w-full border border-black"
                // eslint-disable-next-line react/no-unknown-property
                kr-icon="fas fa-envelope"
                required
              />
            </div>
            <div className="kr-identity-document-type"> </div>
            <div className="kr-identity-document-number"></div>
          </div>
          <button className="kr-payment-button"></button>
        </div>
      }
    </Dialog>
  )
}
