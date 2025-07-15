import React, { useMemo, useState } from "react";
import Hero from "../features/Hero";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCategories, getMenus, order } from "../../../api/api";
import Header from "../features/Header";
import Cart from "../features/Cart";
import MenuItem from "../features/MenuItem";
import { useDisclosure } from "@heroui/react";
import MenuCategories from "../features/MenuCategories";
import MenuItemDetail from "../features/MenuItemDetail";
import toast, { Toaster } from "react-hot-toast";
import SkeletonsMenuItems from "../components/SkeletonsMenuItems";
import SkeletonsCategory from "../components/SkeletonsCategory";
const Home = () => {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  const { data: menus, isLoading: menuLoading } = useQuery({
    queryKey: ["menus"],
    queryFn: getMenus,
  });
  const {
    isSuccess: isSuccess,
    isLoading: orderLoading,
    mutate,
  } = useMutation({
    mutationFn: order,
    onSuccess: () => {
      toast.success("Order placed successfully!");
    },
    onError: (error) => {
      toast.error("order failed!");
    },
  });

  console.log("categories", categories);
  console.log("menus", menus);
  const [notes, setNotes] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState({
    items: [],
    total: 0,
    itemCount: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Filter menu items based on category and search query
  const filteredItems = useMemo(() => {
    let filtered = menus?.data;

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (item) => item.category?.name === selectedCategory
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item?.description
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          item?.category?.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery, menus]);

  // Update cart totals
  const updateCartTotals = (items) => {
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    return { items, total, itemCount };
  };

  // Add item to cart
  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find(
        (cartItem) => cartItem.id === item.id
      );

      let newItems;
      if (existingItem) {
        newItems = prevCart.items.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        newItems = [...prevCart.items, { ...item, quantity: 1 }];
      }

      return updateCartTotals(newItems);
    });
    toast.success("Item added to cart successfully!");
  };

  // Add item to cart with quantity and special instructions
  const handleAddToCartWithDetails = (item, quantity, notes) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find(
        (cartItem) => cartItem.id === item.id && cartItem.notes === notes
      );

      let newItems;
      if (existingItem) {
        newItems = prevCart.items.map((cartItem) =>
          cartItem.id === item.id && cartItem.notes === notes
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        newItems = [...prevCart.items, { ...item, quantity, notes }];
      }

      return updateCartTotals(newItems);
    });
    toast.success("Item added to cart successfully!");
  };
  // Update item quantity in cart
  const handleUpdateQuantity = (id, quantity) => {
    setCart((prevCart) => {
      let newItems;
      if (quantity === 0) {
        newItems = prevCart.items.filter((item) => item.id !== id);
      } else {
        newItems = prevCart.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        );
      }

      return updateCartTotals(newItems);
    });
  };

  // Remove item from cart
  const handleRemoveItem = (id) => {
    setCart((prevCart) => {
      const newItems = prevCart.items.filter((item) => item.id !== id);
      return updateCartTotals(newItems);
    });
  };

  // Handle item click to show detail
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
  };

  // Handle checkout
  const handleCheckout = () => {
    const orders = {
      items: cart?.items?.map((item) => ({
        foodMenuId: item.id,
        quantity: item.quantity,
        notes: item.notes || "",
      })),
      notes: notes,
    };

    mutate(orders);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" reverseOrder={false} />
      <Header
        cart={cart}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCartClick={() => setIsCartOpen(true)}
      />

      <Hero />
      {isLoading ? (
        <SkeletonsCategory />
      ) : (
        <MenuCategories
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredItems?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No items found matching your search.
            </p>
          </div>
        ) : menuLoading ? (
          <SkeletonsMenuItems />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems?.map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                onAddToCart={handleAddToCart}
                onItemClick={handleItemClick}
              />
            ))}
          </div>
        )}
      </main>

      <Cart
        isOpen={isCartOpen}
        cart={cart}
        setCart={setCart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
        notes={notes}
        setNotes={setNotes}
      />

      {selectedItem && (
        <MenuItemDetail
          item={selectedItem}
          isOpen={isDetailOpen}
          onClose={() => {
            setIsDetailOpen(false);
            setSelectedItem(null);
          }}
          onAddToCart={handleAddToCartWithDetails}
        />
      )}
    </div>
  );
};

export default Home;
