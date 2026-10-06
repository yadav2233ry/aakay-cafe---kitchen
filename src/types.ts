export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: 'coffee' | 'starters' | 'mains' | 'drinks' | 'desserts';
  categoryLabel: string;
  description: string;
  isSpecial?: boolean;
  dietary?: 'veg' | 'vegan';
  prepTime?: string;
  calories?: string;
  image?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'interior' | 'coffee' | 'burger' | 'snacks' | 'desserts' | 'drinks';
  categoryLabel: string;
  image: string;
  description: string;
  aspect?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
  favoriteDish: string;
}

export interface ReservationData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequest?: string;
}
