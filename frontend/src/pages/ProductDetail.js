import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Star,
    Heart,
    Share2,
    Truck,
    Shield,
    ArrowLeft,
    Plus,
    Minus,
    ShoppingCart,
    CheckCircle2,
    Clock,
    Sparkles
} from 'lucide-react';
import { useCart } from '../hooks/useCart.js';
import { useAuth } from '../hooks/useAuth.js';
import { productService } from '../services/productService.js';
import LoadingSpinner from '../components/common/LoadingSpinner.js';
import AddToCartAnimation from '../components/cart/AddToCartAnimation.js';
import toast from 'react-hot-toast';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addItemToCart } = useCart();
    const { isAuthenticated } = useAuth();

    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isLiked, setIsLiked] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false);
    const [activeTab, setActiveTab] = useState('description');

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            setIsLoading(true);
            const response = await productService.getProduct(id);
            setProduct(response.data);
        } catch (error) {
            setIsError(true);
            console.error('Error fetching product:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            toast.error('Please login to add items to cart');
            navigate('/login', { state: { from: `/products/${id}` } });
            return;
        }

        try {
            await addItemToCart(product._id, quantity);
            setShowAnimation(true);
            toast.success('Added to cart!');
        } catch (error) {
            toast.error(error || 'Failed to add item to cart');
        }
    };

    const incrementQuantity = () => {
        if (quantity < (product?.stock || 10)) {
            setQuantity(quantity + 1);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: product.name,
                    text: product.description,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            toast.success('Link copied to clipboard!');
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-green-50 pt-20">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex justify-center items-center py-12">
                        <LoadingSpinner size="large" />
                    </div>
                </div>
            </div>
        );
    }

    if (isError || !product) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-green-50 pt-20">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center py-12">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">
                            Product Not Found
                        </h1>
                        <p className="text-gray-600 mb-6">
                            The product you're looking for doesn't exist or has been removed.
                        </p>
                        <button
                            onClick={() => navigate('/products')}
                            className="bg-gradient-to-r from-primary-500 to-green-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all"
                        >
                            Back to Products
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const discountPercentage = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-green-50 pt-20">
            <AddToCartAnimation
                isVisible={showAnimation}
                productImage={product.images?.[0]?.url}
                productName={product.name}
                onAnimationComplete={() => setShowAnimation(false)}
            />

            <div className="container mx-auto px-4 py-8">
                {/* Navigation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span>Back</span>
                    </button>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Product Images */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        {/* Main Image */}
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                            <img
                                src={product.images?.[selectedImage]?.url || '/api/placeholder/600/600'}
                                alt={product.name}
                                className="w-full h-96 object-cover"
                            />
                        </div>

                        {/* Thumbnail Images */}
                        {product.images && product.images.length > 1 && (
                            <div className="flex space-x-4 overflow-x-auto pb-2">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`flex-shrink-0 w-24 h-24 rounded-xl border-2 overflow-hidden transition-all ${selectedImage === index
                                                ? 'border-primary-500 shadow-lg'
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <img
                                            src={image.url}
                                            alt={`${product.name} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Product Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        {/* Category & Brand */}
                        <div>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                                {product.category && (
                                    <span className="bg-gradient-to-r from-primary-100 to-green-100 px-4 py-2 rounded-full text-primary-800 font-medium">
                                        {product.category.name}
                                    </span>
                                )}
                                {product.brand && (
                                    <span className="bg-gray-100 px-4 py-2 rounded-full text-gray-800 font-medium">
                                        {product.brand}
                                    </span>
                                )}
                            </div>

                            {/* Product Name */}
                            <h1 className="text-4xl font-bold text-gray-900 mb-3">
                                {product.name}
                            </h1>

                            {/* Rating */}
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="flex items-center space-x-1">
                                    <Star className="w-6 h-6 text-yellow-400 fill-current" />
                                    <span className="font-bold text-gray-900 text-lg">
                                        {product.ratings?.average || '4.5'}
                                    </span>
                                </div>
                                <span className="text-gray-600">
                                    ({product.ratings?.count || 0} reviews)
                                </span>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="flex items-center space-x-4">
                            <span className="text-4xl font-bold text-gray-900">
                                ₹{product.price}
                            </span>
                            {product.originalPrice && product.originalPrice > product.price && (
                                <>
                                    <span className="text-2xl text-gray-500 line-through">
                                        ₹{product.originalPrice}
                                    </span>
                                    <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                                        {discountPercentage}% OFF
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-lg leading-relaxed">
                            {product.description}
                        </p>

                        {/* Product Details */}
                        <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-2xl p-4">
                            <div className="flex items-center space-x-3">
                                <span className="text-gray-500 font-medium">Unit:</span>
                                <span className="font-bold text-gray-900">
                                    {product.unitValue} {product.unit}
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="text-gray-500 font-medium">Brand:</span>
                                <span className="font-bold text-gray-900">{product.brand || 'Generic'}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="text-gray-500 font-medium">Stock:</span>
                                <span className={`font-bold ${product.stock > 10 ? 'text-green-600' :
                                        product.stock > 0 ? 'text-orange-600' : 'text-red-600'
                                    }`}>
                                    {product.stock > 10 ? 'In Stock' :
                                        product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="text-gray-500 font-medium">Delivery:</span>
                                <span className="font-bold text-gray-900">{product.deliveryTime || 30} min</span>
                            </div>
                        </div>

                        {/* Quantity & Add to Cart */}
                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-700 font-bold text-lg">Quantity:</span>
                                <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-1">
                                    <button
                                        onClick={decrementQuantity}
                                        disabled={quantity <= 1}
                                        className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-200 disabled:opacity-50 transition-colors"
                                    >
                                        <Minus size={18} />
                                    </button>
                                    <span className="w-10 text-center font-bold text-gray-900 text-lg">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={incrementQuantity}
                                        disabled={quantity >= (product.stock || 10)}
                                        className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-200 disabled:opacity-50 transition-colors"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex space-x-4">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleAddToCart}
                                    disabled={product.stock === 0}
                                    className="flex-1 bg-gradient-to-r from-primary-500 to-green-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
                                >
                                    <ShoppingCart size={24} />
                                    <span>
                                        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                                    </span>
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsLiked(!isLiked)}
                                    className="p-4 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all"
                                >
                                    <Heart
                                        size={24}
                                        fill={isLiked ? 'currentColor' : 'none'}
                                        className={isLiked ? 'text-red-500' : ''}
                                    />
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleShare}
                                    className="p-4 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all"
                                >
                                    <Share2 size={24} />
                                </motion.button>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-4 border border-blue-200">
                                <div className="flex items-center space-x-3 mb-2">
                                    <Truck className="text-blue-600" size={20} />
                                    <h3 className="font-bold text-gray-900">Fast Delivery</h3>
                                </div>
                                <p className="text-gray-600 text-sm">In {product.deliveryTime || 30} minutes</p>
                            </div>
                            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-4 border border-green-200">
                                <div className="flex items-center space-x-3 mb-2">
                                    <Shield className="text-green-600" size={20} />
                                    <h3 className="font-bold text-gray-900">Quality Guarantee</h3>
                                </div>
                                <p className="text-gray-600 text-sm">Fresh & Authentic</p>
                            </div>
                            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-4 border border-purple-200">
                                <div className="flex items-center space-x-3 mb-2">
                                    <Sparkles className="text-purple-600" size={20} />
                                    <h3 className="font-bold text-gray-900">Best Prices</h3>
                                </div>
                                <p className="text-gray-600 text-sm">Great discounts</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Product Details Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-16"
                >
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="border-b border-gray-200">
                            <nav className="flex space-x-1 p-1">
                                {[
                                    { id: 'description', name: 'Description' },
                                    { id: 'specifications', name: 'Specifications' },
                                    { id: 'reviews', name: 'Reviews' },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-all ${activeTab === tab.id
                                                ? 'bg-gradient-to-r from-primary-500 to-green-500 text-white shadow-md'
                                                : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        {tab.name}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        <div className="p-8">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {activeTab === 'description' && (
                                        <div className="prose max-w-none">
                                            <p className="text-gray-600 leading-relaxed text-lg">
                                                {product.description}
                                            </p>
                                            {product.features && product.features.length > 0 && (
                                                <div className="mt-8">
                                                    <h4 className="font-bold text-gray-900 text-xl mb-4">Key Features:</h4>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                        {product.features.map((feature, index) => (
                                                            <div key={index} className="flex items-center space-x-3 text-gray-600">
                                                                <CheckCircle2 size={20} className="text-green-500 flex-shrink-0" />
                                                                <span>{feature}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {activeTab === 'specifications' && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {product.nutritionalInfo && (
                                                <div>
                                                    <h4 className="font-bold text-gray-900 text-xl mb-4">Nutritional Information (per 100g):</h4>
                                                    <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
                                                        {Object.entries(product.nutritionalInfo).map(([key, value]) => (
                                                            <div key={key} className="flex justify-between border-b border-gray-100 pb-2 last:border-0">
                                                                <span className="text-gray-600 capitalize font-medium">{key}:</span>
                                                                <span className="font-bold text-gray-900">{value}g</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            <div>
                                                <h4 className="font-bold text-gray-900 text-xl mb-4">Product Details:</h4>
                                                <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
                                                    <div className="flex justify-between border-b border-gray-100 pb-2">
                                                        <span className="text-gray-600 font-medium">Brand</span>
                                                        <span className="font-bold text-gray-900">{product.brand || 'Generic'}</span>
                                                    </div>
                                                    <div className="flex justify-between border-b border-gray-100 pb-2">
                                                        <span className="text-gray-600 font-medium">Unit</span>
                                                        <span className="font-bold text-gray-900">{product.unitValue} {product.unit}</span>
                                                    </div>
                                                    <div className="flex justify-between border-b border-gray-100 pb-2">
                                                        <span className="text-gray-600 font-medium">Shelf Life</span>
                                                        <span className="font-bold text-gray-900">
                                                            {product.expiryDate
                                                                ? new Date(product.expiryDate).toLocaleDateString()
                                                                : '7 days'
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600 font-medium">Storage</span>
                                                        <span className="font-bold text-gray-900">Room Temperature</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'reviews' && (
                                        <div>
                                            {product.reviews && product.reviews.length > 0 ? (
                                                <div className="space-y-6">
                                                    {product.reviews.map((review, index) => (
                                                        <div key={index} className="border-b border-gray-100 pb-6 last:border-b-0">
                                                            <div className="flex items-start space-x-4">
                                                                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                                                                    <span className="font-bold text-gray-600">
                                                                        {review.user?.name?.charAt(0) || 'U'}
                                                                    </span>
                                                                </div>
                                                                <div className="flex-1">
                                                                    <div className="flex items-center justify-between mb-2">
                                                                        <h4 className="font-bold text-gray-900">
                                                                            {review.user?.name || 'Anonymous'}
                                                                        </h4>
                                                                        <div className="flex items-center space-x-1">
                                                                            {[...Array(5)].map((_, i) => (
                                                                                <Star
                                                                                    key={i}
                                                                                    size={16}
                                                                                    className={`${i < review.rating
                                                                                            ? 'text-yellow-400 fill-current'
                                                                                            : 'text-gray-300'
                                                                                        }`}
                                                                                />
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                    <p className="text-gray-600">{review.comment}</p>
                                                                    <div className="text-sm text-gray-500 mt-2 flex items-center space-x-2">
                                                                        <Clock size={14} />
                                                                        <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-center py-12">
                                                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                        <Star size={32} className="text-gray-400" />
                                                    </div>
                                                    <h3 className="text-xl font-bold text-gray-900 mb-2">No reviews yet</h3>
                                                    <p className="text-gray-600">Be the first to review this product!</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProductDetail;