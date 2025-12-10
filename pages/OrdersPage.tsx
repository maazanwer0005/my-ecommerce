export function OrdersPage() {
  // Mock orders data
  const orders = [
    {
      id: "#j6gg6l0",
      date: "12/4/2025",
      total: "$799.97",
      status: "shipped",
      items: [
        { name: "Sony WH-1000XM5 Headphones (x1)", price: "$349.99" },
        { name: "iPad Air 5th Gen (x1)", price: "$599.99" },
      ],
    },
    {
      id: "#op0lt14k",
      date: "12/4/2025",
      total: "$2699.98",
      status: "completed",
      items: [
        { name: "MacBook Pro M3 16\" (x1)", price: "$2499.99" },
      ],
    },
    {
      id: "#p7xhlwt7",
      date: "12/4/2025",
      total: "$799.97",
      status: "shipped",
      items: [
        { name: "Sony WH-1000XM5 Headphones (x1)", price: "$349.99" },
      ],
    },
    {
      id: "#k8mn2p5",
      date: "12/3/2025",
      total: "$1299.99",
      status: "completed",
      items: [
        { name: "Samsung Galaxy S24 Ultra (x1)", price: "$1199.99" },
        { name: "Galaxy Buds Pro (x1)", price: "$199.99" },
      ],
    },
    {
      id: "#r9qw3x7",
      date: "12/2/2025",
      total: "$549.98",
      status: "shipped",
      items: [
        { name: "Nintendo Switch OLED (x1)", price: "$349.99" },
        { name: "Legend of Zelda Game (x1)", price: "$59.99" },
      ],
    },
    {
      id: "#t5ab8c2",
      date: "12/1/2025",
      total: "$1899.97",
      status: "completed",
      items: [
        { name: "LG OLED TV 55\" (x1)", price: "$1499.99" },
        { name: "Soundbar System (x1)", price: "$399.99" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-slate-900 mb-8 font-bold text-3xl sm:text-4xl">My Orders</h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-slate-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div>
                  <h2 className="text-slate-900 font-semibold text-lg sm:text-xl">
                    Order {order.id}
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">Date: {order.date}</p>
                  <p className="text-slate-600 text-sm">Total: {order.total}</p>
                </div>
                <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium self-start sm:self-center">
                  {order.status}
                </span>
              </div>

              {/* Order Items */}
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-slate-700 font-medium mb-3 text-sm sm:text-base">Items:</p>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-4 text-sm sm:text-base"
                    >
                      <span className="text-slate-700">{item.name}</span>
                      <span className="text-slate-900 font-medium">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}