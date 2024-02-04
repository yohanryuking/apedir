import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  setUser: (u) => set({ user: u }),
}));

const useBussinessStore = create((set) => ({
  bussiness: null,
  setBussiness: (b) => set({ bussiness: b }),
}));

const useProvinceStore = create((set) => ({
  province: "todas",
  setProvince: (p) => set({ province: p }),
}));

const useBussinessList = create((set) => ({
  bussinesses: [],
  setBussinesses: (b) => set({ bussinesses: b }),
}));

const useCategoriesList = create((set) => ({
  categories: null,
  setCategories: (c) => set({ categories: c }),
}));

const useProductsList = create((set) => ({
  products: null,
  setProducts: (p) => set({ products: p }),
}));

const useCartStore = create((set) => ({
  cart: [],
  setCart: (p) => set({ cart: p }),
}));

const useAdminUsers = create((set) => ({
  users: [],
  setUsers: (u) => set({ users: u }),
}));

const useAdminBussiness = create((set) => ({
  bussiness: [],
  setBussiness: (b) => set({ bussiness: b }),
}));

const eventsStore = create((set) => ({
  events: [],
  setEvents: (b) => set({ events: b }),
}));

const merchantEvents = create((set) => ({
  events: [],
  setEvents: (b) => set({ events: b }),
}));

const usePlan = create((set) => ({
  plan: null,
  setPlan: (p) => set({ plan: p }),
}));

const useVipBussiness = create((set) => ({
  vipBussiness: null,
  setVipBussiness: (b) => set({ vipBussiness: b }),
}));

const merchantNovedades = create((set) => ({
  novedades: [],
  setNovedades: (b) => set({ novedades: b }),
}));

const showFilter = create((set) => ({
  showFilter: false,
  setShowFilter: (v) => set({ showFilter: v }),
}));

const useCategoryFilter = create((set) => ({
  category: "",
  setCategory: (v) => set({ category: v }),
}));

const useSearchInput = create((set) => ({
  search: "",
  setSearch: (v) => set({ search: v }),
}));

const useFiltredBussiness = create((set) => ({
  bussinessList: [],
  seBussinessList: (v) => set({ bussinessList: v }),
}));

const useFiltredProducts = create((set) => ({
  products: [],
  seProducts: (v) => set({ products: v }),
}));

const useFiltredEvents = create((set) => ({
  events: [],
  setEvents: (v) => set({ events: v }),
}));


const useProductsHome = create((set) => ({
  products: [],
  setProducts: (v) => set({ products: v }),
}));

const whatsappBussinessLink = create((set) => ({
  whatsapp: "",
  setWhatsapp: (v) => set({ whatsapp: v }),
}));

export {
  useUserStore,
  merchantEvents,
  useBussinessStore,
  useProvinceStore,
  useAdminUsers,
  useAdminBussiness,
  useBussinessList,
  useCategoriesList,
  useProductsList,
  useCartStore,
  eventsStore,
  usePlan,
  useVipBussiness,
  merchantNovedades,
  showFilter,
  useCategoryFilter,
  useSearchInput,
  useFiltredBussiness,
  useFiltredProducts,
  useFiltredEvents,
  useProductsHome,
  whatsappBussinessLink
};
