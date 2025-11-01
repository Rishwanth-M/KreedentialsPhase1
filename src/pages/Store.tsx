// src/pages/Store.tsx
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Heart,
  Search,
  Star,
  X,
  Minus,
  Plus,
  Truck,
  ShieldCheck,
  Eye,
  CheckCircle,
  Trophy,
  Flame,
  Crown,
  Clock,
} from "lucide-react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number; // 1-5
  image: string;
  gallery: string[];
  soldCount: number;
  views: number;
  etaDays: number;
  description: string;
  specs: string[];
  inStock: boolean;
  badges: string[]; // e.g. ["PRO ONLY", "LIMITED DROP"]
  sizes?: string[]; // for apparel/shoes
};

const productsSeed: Product[] = [
  {
    id: 1,
    name: "HyperSprint Carbon V2 Shoes",
    category: "Shoes",
    price: 149.99,
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1600185365222-149af0a915cb?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600185365222-149af0a915cb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600185364515-eb66f64e5681?auto=format&fit=crop&w=800&q=80",
    ],
    soldCount: 312,
    views: 1402,
    etaDays: 3,
    inStock: true,
    description:
      "Explosive acceleration carbon plate midsole. Micro-weave upper for insane breathability. Zero energy leak on push-off. Born for 0.00–4.00 seconds.",
    specs: [
      "Carbon plate propulsion core",
      "Energy return: 94%",
      "Stability wrap heel-lock",
      "Surface: Track / Court",
      "Weight: 210g",
    ],
    badges: ["PRO GRADE", "TOP SPEED"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
  },
  {
    id: 2,
    name: "Impact Elite Training Gloves",
    category: "Gear",
    price: 59.99,
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1595974732837-22e1e6a7455a?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1595974732837-22e1e6a7455a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=800&q=80",
    ],
    soldCount: 188,
    views: 756,
    etaDays: 2,
    inStock: true,
    description:
      "ShockGuard palm padding + wrist stabilization band. Built for combat drills, heavy bag, and controlled contact.",
    specs: [
      "ShockGuard™ knuckle damping",
      "WristLock support strap",
      "Anti-slip intelligent palm texture",
    ],
    badges: ["COACH APPROVED"],
  },
  {
    id: 3,
    name: "Recovery Compression Sleeve Kit",
    category: "Recovery",
    price: 39.99,
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80",
    ],
    soldCount: 592,
    views: 2044,
    etaDays: 4,
    inStock: true,
    description:
      "Reduce inflammation, boost circulation, stay fresh between sessions. Used by elite sprinters and pro footballers.",
    specs: ["Targeted gradient compression", "Moisture control fabric"],
    badges: ["RECOVERY", "LIMITED DROP"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 4,
    name: "ThermoFuel Performance Drink (12 pack)",
    category: "Nutrition",
    price: 29.99,
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80",
    ],
    soldCount: 903,
    views: 4112,
    etaDays: 2,
    inStock: true,
    description:
      "Electrolyte + clean stim. Zero crash. Keeps output high deep into 4th quarter, 4th set, OT, whatever.",
    specs: [
      "Electrolyte lock blend",
      "No added sugar",
      "Approved for competition",
    ],
    badges: ["GAME DAY", "BEST SELLER"],
  },
];

const categories = [
  "All",
  "Shoes",
  "Gear",
  "Recovery",
  "Nutrition",
  "Apparel",
  "Accessories",
];

const Store: React.FC = () => {
  // UI state
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // product detail modal
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [detailQty, setDetailQty] = useState(1);

  // favorites / wishlist
  const [favorites, setFavorites] = useState<number[]>([1]); // pretend user already liked item 1

  // cart drawer
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<{ productId: number; qty: number; size?: string | null }[]>([]);

  // derived
  const filteredProducts = useMemo(() => {
    return productsSeed.filter((p) => {
      const matchCat =
        selectedCategory === "All" ? true : p.category === selectedCategory;
      const matchSearch = p.name
        .toLowerCase()
        .includes(search.toLowerCase().trim());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, search]);

  const wishlistProducts = productsSeed.filter((p) =>
    favorites.includes(p.id)
  );

  const cartItems = cart.map((c) => {
    const product = productsSeed.find((p) => p.id === c.productId);
    const price = product ? product.price : 0;
    return {
      ...c,
      product,
      lineTotal: price * c.qty,
    };
  });

  const cartTotal = cartItems
    .reduce((sum, item) => sum + item.lineTotal, 0)
    .toFixed(2);

  // helpers
  const openProductDetails = (p: Product) => {
    setActiveProduct(p);
    setActiveImageIndex(0);
    setDetailQty(1);
    setSelectedSize(p.sizes ? p.sizes[0] : null);
  };

  const closeProductDetails = () => {
    setActiveProduct(null);
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const addToCart = (p: Product, qty: number, size?: string | null) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === p.id && item.size === size
      );
      if (existingIndex !== -1) {
        // update qty
        const clone = [...prev];
        clone[existingIndex] = {
          ...clone[existingIndex],
          qty: clone[existingIndex].qty + qty,
        };
        return clone;
      }
      return [...prev, { productId: p.id, qty, size }];
    });
    setCartOpen(true);
  };

  const updateCartQty = (
    productId: number,
    size: string | null | undefined,
    delta: number
  ) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.productId === productId && item.size === size
            ? { ...item, qty: Math.max(1, item.qty + delta) }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (
    productId: number,
    size: string | null | undefined
  ) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.productId === productId && item.size === size)
      )
    );
  };

  // delivery date calculation for detail modal
  const getDeliveryDate = (etaDays: number) => {
    const d = new Date();
    d.setDate(d.getDate() + etaDays);
    // format like "Nov 2"
    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="relative min-h-screen bg-black text-white px-6 py-10 overflow-hidden">
      {/* subtle lime glow background blob */}
      <div className="pointer-events-none absolute -z-10 top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[180px] bg-lime-400/20" />
      <div className="pointer-events-none absolute -z-10 bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[160px] bg-lime-400/10" />

      {/* HEADER ROW */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3">
            <h1
              className="text-4xl font-extrabold tracking-tight text-lime-400"
              style={{
                textShadow:
                  "0 0 20px rgba(180,255,57,0.7), 0 0 40px rgba(180,255,57,0.4)",
              }}
            >
              KREEDENTIALS STORE
            </h1>
            <div className="text-[10px] px-2 py-[2px] rounded bg-lime-400 text-black font-bold leading-none shadow-[0_0_15px_rgba(180,255,57,0.8)]">
              BETA
            </div>
          </div>

          <div className="mt-2 text-gray-400 text-sm max-w-xl leading-relaxed">
            Gear, fuel, recovery tech. Handpicked for athletes chasing top
            tier. No fluff. Only performance.
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-wider">
            <div className="flex items-center gap-1 text-lime-400">
              <Trophy className="w-4 h-4 text-lime-400" />
              <span>Coach Approved</span>
            </div>
            <div className="flex items-center gap-1 text-orange-400">
              <Flame className="w-4 h-4 text-orange-400" />
              <span>Limited Drops</span>
            </div>
            <div className="flex items-center gap-1 text-yellow-300">
              <Crown className="w-4 h-4 text-yellow-300" />
              <span>Pro Tier Stock</span>
            </div>
          </div>
        </div>

        {/* search + categories + cart */}
        <div className="flex-1 flex flex-col gap-4 lg:max-w-md">
          {/* search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-lime-400 w-5 h-5" />
            <input
              className="w-full bg-gray-900/70 border border-lime-400/30 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 outline-none focus:border-lime-400 shadow-[0_0_20px_rgba(180,255,57,0.15)]"
              placeholder="Search gear, shoes, fuel..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* filter row + cart button */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-track-black scrollbar-thumb-lime-400/40 pr-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap text-xs font-semibold rounded-full border px-3 py-2 transition-all ${
                    selectedCategory === cat
                      ? "bg-lime-400 text-black border-lime-400 shadow-[0_0_20px_rgba(180,255,57,0.6)]"
                      : "bg-black/50 border-lime-400/30 text-gray-400 hover:text-lime-400 hover:bg-black/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setCartOpen(true)}
              className="flex items-center gap-2 bg-lime-400 text-black font-semibold px-4 py-2 rounded-lg hover:bg-lime-300 shadow-[0_0_20px_rgba(180,255,57,0.6)]"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="text-sm">Cart</span>
              {cart.length > 0 && (
                <span className="text-[10px] leading-none bg-black text-lime-400 px-2 py-[2px] rounded font-bold">
                  {cart.length}
                </span>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* WISHLIST / SAVED GEAR */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline gap-3">
            <h2 className="text-white font-semibold text-lg tracking-wide">
              Your Saved Gear
            </h2>
            <span className="text-[11px] text-gray-500 uppercase tracking-wider">
              Wishlist
            </span>
          </div>
          <div className="text-[11px] text-gray-500 flex items-center gap-1">
            <Heart className="w-4 h-4 text-pink-500" />
            <span>{wishlistProducts.length} saved</span>
          </div>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="text-gray-600 text-sm italic">
            Nothing here yet. Tap the heart ♥ on any product to track it.
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-track-black scrollbar-thumb-lime-400/40 pb-4">
            {wishlistProducts.map((prod) => (
              <motion.div
                whileHover={{ scale: 1.03 }}
                key={prod.id}
                className="min-w-[240px] bg-gray-900/80 rounded-xl border border-lime-400/20 p-4 shadow-[0_0_30px_rgba(180,255,57,0.15)] flex-shrink-0"
              >
                <div className="relative w-full h-32 rounded-lg overflow-hidden mb-3">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover"
                  />

                  <button
                    onClick={() => toggleFavorite(prod.id)}
                    className="absolute top-2 right-2 bg-black/70 rounded-full p-2 border border-pink-500/40"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        favorites.includes(prod.id)
                          ? "fill-pink-500 text-pink-500"
                          : "text-gray-500"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <div className="text-sm">
                    <div className="font-semibold text-white leading-tight">
                      {prod.name}
                    </div>
                    <div className="text-[11px] text-gray-500">
                      {prod.category}
                    </div>
                  </div>
                  <div className="text-lime-400 font-bold text-sm">
                    ${prod.price.toFixed(2)}
                  </div>
                </div>

                <div className="flex items-center gap-1 mt-2 text-[10px] text-gray-400">
                  {[...Array(prod.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                  <span className="text-gray-500 ml-1">
                    {prod.soldCount} sold
                  </span>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => openProductDetails(prod)}
                    className="flex-1 text-[11px] bg-black/50 border border-lime-400/30 text-lime-400 rounded-lg py-2 font-semibold hover:bg-black/80"
                  >
                    View
                  </button>
                  <button
                    onClick={() => addToCart(prod, 1)}
                    className="flex-1 text-[11px] bg-lime-400 text-black rounded-lg py-2 font-semibold hover:bg-lime-300"
                  >
                    Add
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredProducts.map((p) => (
          <motion.div
            key={p.id}
            whileHover={{ scale: 1.03 }}
            className="bg-gray-900/80 border border-lime-400/20 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(180,255,57,0.15)] flex flex-col"
          >
            {/* IMAGE / BADGES */}
            <div className="relative">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-56 object-cover transition-transform duration-500 hover:scale-110"
              />

              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {p.badges.map((b, idx) => (
                  <div
                    key={idx}
                    className="text-[10px] px-2 py-[3px] rounded bg-black/80 border border-lime-400/30 text-lime-400 font-bold leading-none shadow-[0_0_10px_rgba(180,255,57,0.6)]"
                  >
                    {b}
                  </div>
                ))}
              </div>

              <button
                onClick={() => toggleFavorite(p.id)}
                className="absolute top-3 right-3 bg-black/70 p-2 rounded-lg border border-pink-500/40 hover:bg-black/90"
              >
                <Heart
                  className={`w-4 h-4 ${
                    favorites.includes(p.id)
                      ? "fill-pink-500 text-pink-500"
                      : "text-gray-400"
                  }`}
                />
              </button>

              {!p.inStock && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-red-400 text-xs font-bold tracking-wider uppercase">
                  Out of Stock
                </div>
              )}
            </div>

            {/* INFO BLOCK */}
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start gap-3">
                <div>
                  <div className="text-white font-semibold leading-tight">
                    {p.name}
                  </div>
                  <div className="text-[11px] text-gray-500">
                    {p.category}
                  </div>
                </div>
                <div className="text-lime-400 text-xl font-bold">
                  ${p.price.toFixed(2)}
                </div>
              </div>

              <div className="mt-2 flex items-center gap-2 text-[11px] text-gray-400 flex-wrap">
                <div className="flex items-center gap-1">
                  {[...Array(p.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3 text-gray-500" />
                  <span>{p.views} views</span>
                </div>
                <div className="text-gray-500">{p.soldCount} sold</div>
              </div>

              <div className="mt-4 flex flex-col gap-2 text-[11px] text-gray-400">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-lime-400" />
                  <span>
                    Est. delivery{" "}
                    <span className="text-lime-400 font-semibold">
                      {getDeliveryDate(p.etaDays)}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-lime-400" />
                  <span>Protected checkout</span>
                </div>
              </div>

              {/* CTA row */}
              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => openProductDetails(p)}
                  className="flex-1 bg-black/50 border border-lime-400/30 text-lime-400 rounded-lg py-2 text-sm font-semibold hover:bg-black/80 hover:text-lime-300"
                >
                  View Details
                </button>
                <button
                  disabled={!p.inStock}
                  onClick={() => addToCart(p, 1)}
                  className={`flex-1 rounded-lg py-2 text-sm font-semibold ${
                    p.inStock
                      ? "bg-lime-400 text-black hover:bg-lime-300 shadow-[0_0_20px_rgba(180,255,57,0.6)]"
                      : "bg-gray-700 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* PRODUCT DETAIL OVERLAY (BOTTOM SHEET STYLE) */}
      <AnimatePresence>
        {activeProduct && (
          <motion.div
            key={activeProduct.id}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
            className="fixed bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto bg-black/95 border-t border-lime-400/30 rounded-t-2xl shadow-[0_0_60px_rgba(180,255,57,0.4)] z-[70] p-6"
          >
            {/* header row */}
            <div className="flex items-start justify-between mb-5">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl font-bold text-white leading-tight">
                    {activeProduct.name}
                  </h2>

                  {activeProduct.badges.map((b, i) => (
                    <div
                      key={i}
                      className="text-[9px] px-2 py-[2px] rounded bg-black/80 border border-lime-400/30 text-lime-400 font-bold leading-none shadow-[0_0_10px_rgba(180,255,57,0.6)] uppercase tracking-wide"
                    >
                      {b}
                    </div>
                  ))}
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-gray-400">
                  <div className="flex items-center gap-1">
                    {[...Array(activeProduct.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                    <span className="text-gray-500 ml-1">
                      {activeProduct.soldCount} sold
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-gray-400">
                    <Eye className="w-3 h-3 text-gray-500" />
                    <span>{activeProduct.views} views</span>
                  </div>

                  <div className="flex items-center gap-1 text-lime-400">
                    <Clock className="w-3 h-3 text-lime-400" />
                    <span>
                      Arrives by{" "}
                      <span className="text-lime-400 font-semibold">
                        {getDeliveryDate(activeProduct.etaDays)}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={closeProductDetails}
                className="text-gray-500 hover:text-white bg-white/5 rounded-lg p-2 border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* content row: gallery + info */}
            <div className="flex flex-col lg:flex-row gap-8">
              {/* GALLERY SIDE */}
              <div className="w-full lg:w-1/2">
                <div className="relative w-full rounded-xl overflow-hidden border border-lime-400/30 bg-black/50 shadow-[0_0_30px_rgba(180,255,57,0.25)]">
                  <img
                    src={activeProduct.gallery[activeImageIndex]}
                    alt={activeProduct.name}
                    className="w-full h-[250px] md:h-[320px] lg:h-[360px] object-cover"
                  />
                </div>

                <div className="flex gap-3 overflow-x-auto mt-4 pb-2 scrollbar-thin scrollbar-track-black scrollbar-thumb-lime-400/40">
                  {activeProduct.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`min-w-[70px] h-[70px] rounded-lg overflow-hidden border ${
                        idx === activeImageIndex
                          ? "border-lime-400 shadow-[0_0_20px_rgba(180,255,57,0.6)]"
                          : "border-gray-700"
                      }`}
                    >
                      <img
                        src={img}
                        alt="thumb"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* INFO SIDE */}
              <div className="flex-1 flex flex-col gap-6">
                {/* PRICE + IN STOCK */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <div className="text-3xl font-bold text-lime-400 leading-none">
                      ${activeProduct.price.toFixed(2)}
                    </div>
                    {activeProduct.inStock ? (
                      <div className="text-[10px] flex items-center gap-1 px-2 py-[2px] rounded bg-lime-400/10 text-lime-400 border border-lime-400/30 font-semibold uppercase tracking-wider">
                        <CheckCircle className="w-3 h-3" /> In Stock
                      </div>
                    ) : (
                      <div className="text-[10px] px-2 py-[2px] rounded bg-red-500/10 text-red-400 border border-red-400/30 font-semibold uppercase tracking-wider">
                        Out of Stock
                      </div>
                    )}
                  </div>

                  <div className="text-[12px] text-gray-400 flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-lime-400" />
                      <span>
                        Delivery by{" "}
                        <span className="text-lime-400 font-semibold">
                          {getDeliveryDate(activeProduct.etaDays)}
                        </span>{" "}
                        · {activeProduct.etaDays}-day express
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-lime-400" />
                      <span>Secure checkout & return support</span>
                    </div>
                  </div>
                </div>

                {/* SIZE PICKER (if any) */}
                {activeProduct.sizes && (
                  <div className="flex flex-col gap-2">
                    <div className="text-[11px] text-gray-400 uppercase tracking-wider">
                      Select Size
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeProduct.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-2 rounded-lg border text-sm font-semibold ${
                            selectedSize === size
                              ? "bg-lime-400 text-black border-lime-400 shadow-[0_0_15px_rgba(180,255,57,0.6)]"
                              : "bg-black/50 border-lime-400/30 text-gray-300 hover:text-lime-400 hover:bg-black/80"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* QTY PICKER */}
                <div className="flex flex-col gap-2">
                  <div className="text-[11px] text-gray-400 uppercase tracking-wider">
                    Quantity
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      className="bg-black/50 border border-gray-700 rounded-lg p-2 text-white hover:bg-black/80"
                      onClick={() =>
                        setDetailQty((q) => Math.max(1, q - 1))
                      }
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <div className="text-lg font-semibold text-white min-w-[2ch] text-center">
                      {detailQty}
                    </div>

                    <button
                      className="bg-black/50 border border-gray-700 rounded-lg p-2 text-white hover:bg-black/80"
                      onClick={() => setDetailQty((q) => q + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() =>
                      addToCart(
                        activeProduct,
                        detailQty,
                        selectedSize ?? undefined
                      )
                    }
                    className="flex-1 bg-lime-400 text-black py-3 rounded-lg font-semibold text-sm hover:bg-lime-300 shadow-[0_0_20px_rgba(180,255,57,0.6)]"
                  >
                    Add to Cart
                  </button>
                  <button className="flex-1 bg-white/10 border border-white/20 text-white py-3 rounded-lg font-semibold text-sm hover:bg-white/20">
                    Buy Now
                  </button>
                </div>

                {/* DESCRIPTION */}
                <div className="bg-gray-900/40 border border-lime-400/20 rounded-xl p-4">
                  <div className="text-[11px] text-lime-400 uppercase tracking-wider mb-2 font-semibold">
                    Description
                  </div>
                  <div className="text-sm text-gray-300 leading-relaxed">
                    {activeProduct.description}
                  </div>
                </div>

                {/* SPECS */}
                <div className="bg-gray-900/40 border border-lime-400/20 rounded-xl p-4">
                  <div className="text-[11px] text-lime-400 uppercase tracking-wider mb-2 font-semibold">
                    Tech / Specs
                  </div>
                  <ul className="text-sm text-gray-300 leading-relaxed list-disc list-inside">
                    {activeProduct.specs.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>

                {/* TRUST / SAFE / HYPE LINE */}
                <div className="flex flex-col gap-2 text-[11px] text-gray-500">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="text-lime-400 w-4 h-4" />
                    <span>Protected Checkout. SSL Encrypted.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="text-lime-400 w-4 h-4" />
                    <span>Fast Dispatch from Verified Partner Warehouse.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Crown className="text-yellow-300 w-4 h-4" />
                    <span>Official Kreedentials Performance Supplier.</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CART DRAWER */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
            className="fixed top-0 right-0 h-full w-[90%] max-w-sm bg-black/95 border-l border-lime-400/30 shadow-[0_0_60px_rgba(180,255,57,0.4)] z-[80] flex flex-col"
          >
            {/* drawer header */}
            <div className="flex items-start justify-between p-6 border-b border-lime-400/20">
              <div>
                <div className="text-lg font-bold text-white flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-lime-400" />
                  <span>Your Cart</span>
                </div>
                <div className="text-[11px] text-gray-500 tracking-wider uppercase">
                  {cartItems.length} item{cartItems.length !== 1 && "s"} ·{" "}
                  ${cartTotal}
                </div>
              </div>

              <button
                onClick={() => setCartOpen(false)}
                className="text-gray-500 hover:text-white bg-white/5 rounded-lg p-2 border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* cart contents */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center text-gray-600 text-sm italic mt-20">
                  Cart is empty. Go grab something lethal.
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 bg-gray-900/40 border border-lime-400/20 rounded-xl p-4"
                  >
                    {/* product thumbnail */}
                    <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-700 flex-shrink-0">
                      {item.product && (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    {/* info + actions */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-sm font-semibold text-white leading-tight">
                            {item.product?.name}
                          </div>
                          <div className="text-[11px] text-gray-500 leading-tight">
                            {item.product?.category}
                            {item.size ? ` · ${item.size}` : ""}
                          </div>
                        </div>
                        <div className="text-lime-400 font-bold text-sm">
                          ${item.product
                            ? item.product.price.toFixed(2)
                            : "0.00"}
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        {/* qty controls */}
                        <div className="flex items-center gap-3">
                          <button
                            className="bg-black/50 border border-gray-700 rounded-lg p-2 text-white hover:bg-black/80"
                            onClick={() =>
                              updateCartQty(
                                item.productId,
                                item.size,
                                -1
                              )
                            }
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <div className="text-white text-sm font-semibold min-w-[2ch] text-center">
                            {item.qty}
                          </div>
                          <button
                            className="bg-black/50 border border-gray-700 rounded-lg p-2 text-white hover:bg-black/80"
                            onClick={() =>
                              updateCartQty(
                                item.productId,
                                item.size,
                                +1
                              )
                            }
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* remove */}
                        <button
                          onClick={() =>
                            removeFromCart(item.productId, item.size)
                          }
                          className="text-[11px] text-red-400 hover:text-red-300 uppercase tracking-wider"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* checkout summary */}
            <div className="border-t border-lime-400/20 p-6 bg-black/60">
              <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                <span>Subtotal</span>
                <span className="text-white font-semibold">
                  ${cartTotal}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-gray-500 mb-4">
                <ShieldCheck className="w-4 h-4 text-lime-400" />
                <span>Secure checkout · 100% encrypted</span>
              </div>

              <button className="w-full bg-lime-400 text-black font-semibold py-3 rounded-lg text-sm hover:bg-lime-300 shadow-[0_0_25px_rgba(180,255,57,0.6)]">
                Proceed to Checkout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Store;
