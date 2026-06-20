import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'

// Admin imports
import AdminLayout from './admin/layouts/AdminLayout'
import AdminLogin from './admin/pages/AdminLogin'
import AdminDashboard from './admin/pages/AdminDashboard'
import AdminProducts from './admin/pages/AdminProducts'
import AdminOrders from './admin/pages/AdminOrders'
import AdminDiscounts from './admin/pages/AdminDiscounts'
import AdminCatalogs from './admin/pages/AdminCatalogs'
import AdminAnalytics from './admin/pages/AdminAnalytics'
import AdminUsers from './admin/pages/AdminUsers'
import AdminReturns from './admin/pages/AdminReturns'
import AdminShipping from './admin/pages/AdminShipping'
import AdminProcurement from './admin/pages/AdminProcurement'
import AdminBilling from './admin/pages/AdminBilling'
import AdminCRM from './admin/pages/AdminCRM'

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<>
        <div className="app">
          <Header />
          <div className="main-content home-main-content">
            <Home />
          </div>
          <Footer />
        </div>
      </>} />
      <Route path="/product/:id" element={<>
        <div className="app">
          <Header />
          <div className="main-content product-detail-main-content">
            <ProductDetail />
          </div>
          <Footer />
        </div>
      </>} />
      <Route path="/products" element={<>
        <div className="app">
          <Header />
          <div className="main-content shop-main-content">
            <Products />
          </div>
          <Footer />
        </div>
      </>} />
      <Route path="/products/category/:slug" element={<>
        <div className="app">
          <Header />
          <div className="main-content shop-main-content">
            <Products />
          </div>
          <Footer />
        </div>
      </>} />
      <Route path="/cart" element={<>
        <div className="app">
          <Header />
          <div className="main-content cart-main-content">
            <Cart />
          </div>
          <Footer />
        </div>
      </>} />
      <Route path="/checkout" element={<>
        <div className="app">
          <Header />
          <div className="main-content checkout-main-content">
            <Checkout />
          </div>
          <Footer />
        </div>
      </>} />
      <Route path="/inspiracion" element={<>
        <div className="app">
          <Header />
          <div className="main-content blog-main-content"><Blog /></div>
          <Footer />
        </div>
      </>} />
      <Route path="/inspiracion/:slug" element={<>
        <div className="app">
          <Header />
          <div className="main-content blog-main-content"><BlogDetail /></div>
          <Footer />
        </div>
      </>} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
      <Route path="/admin/products" element={<AdminLayout><AdminProducts /></AdminLayout>} />
      <Route path="/admin/orders" element={<AdminLayout><AdminOrders /></AdminLayout>} />
      <Route path="/admin/procurement" element={<AdminLayout><AdminProcurement /></AdminLayout>} />
      <Route path="/admin/discounts" element={<AdminLayout><AdminDiscounts /></AdminLayout>} />
      <Route path="/admin/catalogs" element={<AdminLayout><AdminCatalogs /></AdminLayout>} />
      <Route path="/admin/analytics" element={<AdminLayout><AdminAnalytics /></AdminLayout>} />
      <Route path="/admin/users" element={<AdminLayout><AdminUsers /></AdminLayout>} />
      <Route path="/admin/returns" element={<AdminLayout><AdminReturns /></AdminLayout>} />
      <Route path="/admin/shipping" element={<AdminLayout><AdminShipping /></AdminLayout>} />
      <Route path="/admin/billing" element={<AdminLayout><AdminBilling /></AdminLayout>} />
      <Route path="/admin/crm" element={<AdminLayout><AdminCRM /></AdminLayout>} />
    </Routes>
  )
}

export default App
