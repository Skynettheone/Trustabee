import React, { useState } from 'react';
import Card, { CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { Star, Filter, Search, ChevronDown, CheckCircle, ShoppingCart, Heart } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

type Filters = {
  type: string[];
  region: string[];
  organic: boolean;
  priceRange: [number, number];
};

const BrowseProducts: React.FC = () => {
  const {
    products,
    addToCart,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    isInCart,
  } = useShop();

  const [searchTerm, setSearchTerm] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    type: [],
    region: [],
    organic: false,
    priceRange: [0, 50],
  });
  
  const toggleFilter = () => {
    setFiltersOpen(!filtersOpen);
  };

  // Filter products based on search and filters
  const filteredProducts = products.filter(product => {
    // Search term filter
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !product.farm.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !product.type.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Type filter
    if (selectedFilters.type.length > 0 && !selectedFilters.type.includes(product.type)) {
      return false;
    }
    
    // Region filter
    if (selectedFilters.region.length > 0 && !selectedFilters.region.includes(product.region)) {
      return false;
    }
    
    // Organic filter
    if (selectedFilters.organic && !product.organic) {
      return false;
    }
    
    // Price range filter
    if (product.price < selectedFilters.priceRange[0] || product.price > selectedFilters.priceRange[1]) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Browse Verified Honey Products</h1>
      
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search honey products..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            variant="outline"
            className="flex items-center sm:w-auto"
            onClick={toggleFilter}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            <ChevronDown className={`h-4 w-4 ml-2 transform ${filtersOpen ? 'rotate-180' : ''}`} />
          </Button>
        </div>
        
        {/* Expanded Filters */}
        {filtersOpen && (
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Honey Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Honey Type
              </label>
              <div className="space-y-2">
                {['Wildflower', 'Cinnamon', 'Forest', 'Coconut Flower', 'Mountain', 'Jackfruit'].map((type) => (
                  <div key={type} className="flex items-center">
                    <input
                      id={`type-${type}`}
                      name={`type-${type}`}
                      type="checkbox"
                      className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                      checked={selectedFilters.type.includes(type)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFilters({
                            ...selectedFilters,
                            type: [...selectedFilters.type, type]
                          });
                        } else {
                          setSelectedFilters({
                            ...selectedFilters,
                            type: selectedFilters.type.filter(t => t !== type)
                          });
                        }
                      }}
                    />
                    <label htmlFor={`type-${type}`} className="ml-2 text-sm text-gray-700">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Region Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Region
              </label>
              <div className="space-y-2">
                {['Central Province', 'Western Province', 'Southern Province', 'Uva Province', 'North Western Province'].map((region) => (
                  <div key={region} className="flex items-center">
                    <input
                      id={`region-${region}`}
                      name={`region-${region}`}
                      type="checkbox"
                      className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                      checked={selectedFilters.region.includes(region)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFilters({
                            ...selectedFilters,
                            region: [...selectedFilters.region, region]
                          });
                        } else {
                          setSelectedFilters({
                            ...selectedFilters,
                            region: selectedFilters.region.filter(r => r !== region)
                          });
                        }
                      }}
                    />
                    <label htmlFor={`region-${region}`} className="ml-2 text-sm text-gray-700">
                      {region}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Range
              </label>
              <div className="space-y-4 px-2">
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="1"
                  value={selectedFilters.priceRange[1]}
                  onChange={(e) => {
                    setSelectedFilters({
                      ...selectedFilters,
                      priceRange: [selectedFilters.priceRange[0], parseInt(e.target.value)]
                    });
                  }}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">£{selectedFilters.priceRange[0]}</span>
                  <span className="text-sm text-gray-700 font-medium">
                    Up to £{selectedFilters.priceRange[1]}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Other Filters */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Other Filters
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    id="organic"
                    name="organic"
                    type="checkbox"
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                    checked={selectedFilters.organic}
                    onChange={(e) => {
                      setSelectedFilters({
                        ...selectedFilters,
                        organic: e.target.checked
                      });
                    }}
                  />
                  <label htmlFor="organic" className="ml-2 text-sm text-gray-700">
                    Organic Only
                  </label>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-4 flex justify-end space-x-2 pt-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setSelectedFilters({
                    type: [],
                    region: [],
                    organic: false,
                    priceRange: [0, 50],
                  });
                }}
              >
                Clear Filters
              </Button>
              <Button 
                size="sm"
                onClick={toggleFilter}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Results Summary */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-600 mb-2 sm:mb-0">
          Showing {filteredProducts.length} products
        </p>
        <div className="flex items-center">
          <span className="text-sm text-gray-600 mr-2">Sort by:</span>
          <select className="border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 text-sm">
            <option>Most Popular</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating: High to Low</option>
            <option>Newest First</option>
          </select>
        </div>
      </div>
      
      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} hover className="flex flex-col h-full">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-56 object-cover rounded-t-lg"
                />
                <div className="absolute top-2 right-2 flex space-x-1">
                  <button
                    className={`p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-100 ${isFavorite(product.id) ? 'text-amber-500' : 'text-gray-500'}`}
                    onClick={() => isFavorite(product.id) ? removeFromFavorites(product.id) : addToFavorites(product)}
                    aria-label={isFavorite(product.id) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
                {product.verified && (
                  <div className="absolute top-2 left-2">
                    <Badge variant="success" className="flex items-center px-2 py-1">
                      <CheckCircle className="h-3 w-3 mr-1" />
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
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-amber-500" />
                    <span className="ml-1 text-sm font-medium text-gray-900">{product.rating}</span>
                  </div>
                  <span className="ml-1 text-xs text-gray-500">({product.reviewCount} reviews)</span>
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
                    {isInCart(product.id) ? 'Added' : 'Add'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="mx-auto max-w-md">
            <Search className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
            <p className="mt-1 text-gray-500">
              Try adjusting your search or filter criteria to find what you're looking for.
            </p>
            <div className="mt-6">
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedFilters({
                    type: [],
                    region: [],
                    organic: false,
                    priceRange: [0, 50],
                  });
                }}
              >
                Clear All Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowseProducts;