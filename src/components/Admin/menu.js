import axios from 'axios';

export const addToCart = async(item) => {
    try {
        const formData = new FormData();
        formData.append('name', item.name);
        formData.append('description', item.description);
        formData.append('price', item.price);
        formData.append('categories', item.categories);
        formData.append('image', item.file);

        const response = await axios.post('https://heatwavevps.site/menu/postmenu', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log('Item added to cart successfully!', response.data);
    } catch (error) {
        console.error('Error adding item to cart:', error.response ? error.response.data : error.message);
        throw new Error('Failed to add item to cart');
    }
};

export default addToCart;