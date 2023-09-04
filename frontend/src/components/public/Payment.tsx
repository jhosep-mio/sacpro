import { useParams } from 'react-router-dom'

export const Payment = (): JSX.Element => {
  const { token } = useParams()
  // Declarar formToken como estado local
  return (
    <section className="w-[500px] mx-auto m-10">
        <>
          <div
            className="kr-embedded w-full h-full"
            // eslint-disable-next-line react/no-unknown-property
            kr-form-token={token}
            id="myPaymentForm"
          >
            <div className="flex-container">
              <div className="kr-pan"></div>
            </div>
            <div className="flex-container">
              <div className="kr-expiry"></div>
              <div className="kr-security-code"></div>
            </div>
            <div className="flex-container">
              <div className="kr-identity-document-type"> </div>
              <div className="kr-identity-document-number"></div>
            </div>
            <button className="kr-payment-button"></button>
          </div>
        </>
    </section>
  )
}
