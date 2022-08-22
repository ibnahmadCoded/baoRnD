import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "pk_test_51LZVa3Cd0GCKuogEkWsfAx5SVEGmaHI4VhlQldVYzzL2V7lKjIzby6tb9WrEmFRkRWuB456cnFKm6znxkp1VALyw00TSu4ZSTv"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer({amount}) {

	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm amount = {amount} />
		</Elements>
	)
}