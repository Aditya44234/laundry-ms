import OrderForm from "../Components/OrderForm"

export default function CreateOrderPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">

        <h1 className="text-3xl font-semibold tracking-tight text-white-900 sm:text-4xl">
          Add a new customer order
        </h1>
      </div>
      <OrderForm />
    </section>
  )
}
