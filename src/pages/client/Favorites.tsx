import React from 'react';
import Card, { CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { Heart, ShoppingCart, X } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

const Favorites: React.FC = () => {
  const { favorites, addToCart, removeFromFavorites, isInCart } = useShop();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <Heart className="h-6 w-6 text-amber-500 mr-2" /> My Favorites
      </h1>
      {favorites.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <Heart className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No favorites yet</h3>
          <p className="mt-1 text-gray-500">Mark products as favorite to see them here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((product) => (
            <Card key={product.id} hover className="flex flex-col h-full">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-56 object-cover rounded-t-lg"
                />
                <button
                  className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-100 text-red-500"
                  onClick={() => removeFromFavorites(product.id)}
                  aria-label="Remove from favorites"
                >
                  <X className="h-5 w-5" />
                </button>
                {product.verified && (
                  <div className="absolute top-2 left-2">
                    <Badge variant="success" className="flex items-center px-2 py-1">
                      Verified
                    </Badge>
                  </div>
                )}
                {product.organic && (
                  <div className="absolute bottom-2 left-2">
                    <Badge variant="primary" className="px-2 py-1">
                      Organic
                    </Badge>
                  </div>
                )}
              </div>
              <CardContent className="flex-grow flex flex-col">
                <div className="mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.farm}</p>
                </div>
                <div className="mb-2">
                  <Badge variant="secondary">{product.type}</Badge>
                  <span className="ml-2 text-xs text-gray-500">{product.region}</span>
                </div>
                <div className="flex items-center mb-3">
                  <span className="text-sm text-gray-600 mr-2">{product.rating}★</span>
                  <span className="text-xs text-gray-500">({product.reviewCount} reviews)</span>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-gray-900">£{product.price}</span>
                    <span className="text-sm text-gray-600 ml-1">/ {product.quantity}{product.unit}</span>
                  </div>
                  <Button
                    size="sm"
                    className="flex items-center"
                    onClick={() => addToCart(product)}
                    disabled={isInCart(product.id)}
                  >
                    <ShoppingCart className="mr-1 h-4 w-4" />
                    {isInCart(product.id) ? 'Added' : 'Add to Cart'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites; 