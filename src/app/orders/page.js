import OrdersList from "../Components/OrdersList"

export default function OrdersPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
    
        <h1 className="text-3xl font-semibold tracking-tight text-white-900 sm:text-4xl">
          Track and update every order
        </h1>
      </div>
      <OrdersList />
    </section>
  )
}
