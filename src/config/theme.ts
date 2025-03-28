export interface ThemeConfig {
  brand: {
    name: string;
    logo: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    textColor: string;
    backgroundColor: string;
  };
  currency: {
    symbol: string;
    position: 'before' | 'after';
  };
  status: {
    available: {
      color: string;
      text: string;
    };
    lowStock: {
      color: string;
      text: string;
    };
    unavailable: {
      color: string;
      text: string;
    };
  };
}

// Default theme configuration
export const defaultTheme: ThemeConfig = {
  brand: {
    name: "FLX Delivery",
    logo: "/asun.png",
    primaryColor: "#B2151B",
    secondaryColor: "#FF6B6B",
    accentColor: "#FFD93D",
    textColor: "#333333",
    backgroundColor: "#FFFFFF",
  },
  currency: {
    symbol: "₦",
    position: "before",
  },
  status: {
    available: {
      color: "bg-green-100 text-green-800",
      text: "available",
    },
    lowStock: {
      color: "bg-yellow-100 text-yellow-800",
      text: "low in stock",
    },
    unavailable: {
      color: "bg-red-100 text-red-800",
      text: "unavailable",
    },
  },
};

// Example whitelabeled theme
export const whitelabelTheme: ThemeConfig = {
  brand: {
    name: "FoodExpress",
    logo: "/foodexpress-logo.png",
    primaryColor: "#2E7D32",
    secondaryColor: "#4CAF50",
    accentColor: "#FFC107",
    textColor: "#212121",
    backgroundColor: "#FFFFFF",
  },
  currency: {
    symbol: "$",
    position: "before",
  },
  status: {
    available: {
      color: "bg-emerald-100 text-emerald-800",
      text: "in stock",
    },
    lowStock: {
      color: "bg-amber-100 text-amber-800",
      text: "running low",
    },
    unavailable: {
      color: "bg-rose-100 text-rose-800",
      text: "out of stock",
    },
  },
}; 